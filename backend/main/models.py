import os
import shutil
from secrets import token_urlsafe

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import now


class User(AbstractUser):
    pass


class Dir(models.Model):
    name = models.CharField(max_length=30)
    dirs = models.ManyToManyField('Dir', blank=True)
    files = models.ManyToManyField('File', blank=True)
    downloads = models.IntegerField(default=0)
    created_date = models.DateTimeField(default=now, editable=False)

    def __str__(self):
        return '#{} {}'.format(self.id, self.name)

    def inc_download(self):
        Dir.objects.filter(pk=self.pk).update(downloads=models.F('downloads') + 1)

    def archieve_token(self):
        #TODO add oportunity to create zip/tar.xz archives based on archive_type param
        token = token_urlsafe(16)
        path_with_token = os.path.join(settings.ARCHIVES_ROOT, token)
        while os.path.exists(path_with_token):
            token = token_urlsafe(16)
            path_with_token = os.path.join(settings.ARCHIVES_ROOT, token)
        
        os.mkdir(path_with_token)

        self.prepare_dir(self.id, path_with_token)

        shutil.make_archive(path_with_token, 'zip', path_with_token)

        return token
    
    @classmethod
    def prepare_dir(self, id, space):
        """"Recursive prepare dirs structure for archiving"""
        dir_record = self.objects.get(pk=id)
        dir_record.inc_download()

        for the_file in dir_record.files.all():
            the_file.inc_download()
            filename = os.path.basename(the_file.file.name)

            file_path = os.path.join(settings.MEDIA_ROOT, filename)
            new_path = os.path.join(space, filename)

            shutil.copy(file_path, new_path)
            if filename != the_file.full_name:
                os.rename(new_path, os.path.join(space, the_file.full_name))
        
        for the_dir in dir_record.dirs.all():
            next_dir_path = os.path.join(space, the_dir.name)
            os.mkdir(next_dir_path)
            self.prepare_dir(the_dir.id, next_dir_path)

    @classmethod
    def clear_archieve_data(self, token):
        archive_path = os.path.join(settings.ARCHIVES_ROOT, token)
        shutil.rmtree(archive_path)
        os.remove(archive_path + '.zip')

    @classmethod
    def add_new(self, value, parent_dir_id, add_message):
        """Creating new record only if name is valid"""
        if len(value) > 30:
            add_message('Value should be no longer than 30 symbols')
        else:
            parent_dir = self.objects.get(pk=parent_dir_id)
            if value.lower() in list(map(lambda x: x.name.lower(), parent_dir.dirs.all())):
                add_message('A directory with that name already exists')
            else:
                instance = self(name=value)
                instance.save()
                parent_dir.dirs.add(self.objects.get(pk=instance.id))

    @classmethod
    def correct_name(self, name, parent_dir_id, add_message):
        """Correcting name for creating new record anyway"""
        parent_dir = self.objects.get(pk=parent_dir_id)
        existing_names = list(map(lambda x: x.name.lower(), parent_dir.dirs.all()))
        if len(name) > 30 or name.lower() in existing_names:
            name_with_token = name[:22] + token_urlsafe()[:8]
            while name_with_token.lower() in existing_names:
                name_with_token = name[:22] + token_urlsafe()[:8]
            add_message(f'Directory name was changed to {name_with_token}')
            return name_with_token
        return name

    @classmethod
    def upload(self, files, relpaths, parent_dir_id, add_message):
        paths = [path.split('/')[:-1] for path in relpaths]
        #file_dir_ids is a list of dir's ids where files located
        file_dir_ids = []
        
        dir_inst = self(name=self.correct_name(paths[0][0], parent_dir_id, add_message))
        dir_inst.save()
        d = [{
            dir_inst.id: {
                'name': paths[0][0],
                'cont': []
            }
        }]
        self.objects.get(pk=parent_dir_id).dirs.add(self.objects.get(pk=dir_inst.id))
        saved_id = dir_inst.id #Currently root id

        for path in paths:
            d_link = d #Linking object behind d variable
            for part in path:
                id = 0
                # for key, value in d_link.items():
                for index, i in enumerate(d_link):
                    key, value = list(i.items())[0]
                    if value['name'] == part: 
                        id = key
                        break
                if id: #if part was finded
                    d_link = d_link[index][id]['cont']
                    saved_id = id
                else: #Create new Dir Record
                    dir_inst = self(name=self.correct_name(part, saved_id, add_message))
                    dir_inst.save()
                    self.objects.get(pk=saved_id).dirs.add(self.objects.get(pk=dir_inst.id))
                    d_link.append({dir_inst.id: {
                        'name': part,
                        'cont': []
                    }})
                    d_link = d_link[-1][dir_inst.id]['cont']
                    saved_id = dir_inst.id
            
            file_dir_ids.append(saved_id)
                        
        for id, the_file in enumerate(files):
            File.upload(the_file, file_dir_ids[id], add_message)


class File(models.Model):
    name = models.CharField(max_length=30)
    ext = models.CharField(max_length=10)
    file = models.FileField()
    downloads = models.IntegerField(default=0)
    created_date = models.DateTimeField(default=now, editable=False)
    mmtype = models.CharField(max_length=100, default='content/file')

    @property
    def full_name(self):
        return f'{self.name}.{self.ext}'

    def __str__(self):
        return f'#{self.id} {self.name}.{self.ext}'
    
    def inc_download(self):
        File.objects.filter(pk=self.pk).update(downloads=models.F('downloads') + 1)

    @classmethod
    def correct_name(self, name, parent_dir_id, add_message):
        """Correcting for creating new record anyway"""
        parent_dir = Dir.objects.get(pk=parent_dir_id)
        existing_names = list(map(lambda x: x.name.lower(), parent_dir.files.all()))
        if len(name) > 30 or name.lower() in existing_names:
            name_with_token = name[:22] + token_urlsafe()[:8]
            while name_with_token.lower() in existing_names:
                name_with_token = name[:22] + token_urlsafe()[:8]
            add_message(f'File name was changed to {name_with_token}')
            return name_with_token
        return name
    
    @classmethod
    def upload(self, the_file, parent_dir_id, add_message):
        if the_file.size > settings.MAX_UPLOAD_SIZE:
            return add_message(f'{the_file.name} wasnt uploaded, its size more than {settings.MAX_UPLOAD_SIZE_LABEL}')

        last_dot_index = the_file.name.rfind('.')
        instance = self(
            file=the_file, 
            name=self.correct_name(the_file.name[:last_dot_index], parent_dir_id, add_message),
            ext=the_file.name[last_dot_index + 1:],
            mmtype=the_file.content_type,
        )
        instance.save()
        parentDir = Dir.objects.get(pk=parent_dir_id)
        parentDir.files.add(self.objects.get(pk=instance.id))
