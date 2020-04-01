import os
import shutil
from secrets import token_urlsafe

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import now


class User(AbstractUser):
    
    def __str__(self):
        return f'#{self.id} {self.username}'


class Dir(models.Model):
    name = models.CharField(max_length=30)
    dirs = models.ManyToManyField('Dir', blank=True)
    files = models.ManyToManyField('File', blank=True)
    downloads = models.IntegerField(default=0)
    created_date = models.DateTimeField(default=now, editable=False)
    owner = models.ForeignKey('User', related_name='dirs', on_delete=models.CASCADE, default=1)

    def __str__(self):
        return '#{} {}'.format(self.id, self.name)
 
    def safe_delete(self, user, add_message):
        """remove only files created by user and dirs that don't containt files/dirs created by other users"""
        if self.owner == user:
            for file in self.files.all():
                file.safe_delete(user, lambda x: None)#Do not add messages
            for dir in self.dirs.all():
                dir.safe_delete(user, lambda x: None)#Do not add messages
            updated_dir = Dir.objects.get(pk=self.id)
            if not len(updated_dir.files.all()) and not len(updated_dir.dirs.all()):
                self.delete()
                add_message(f'Directory {self.name} was removed')
            else:
                add_message(f'There was only your content removed from {self.name} directory')
    
    def safe_rename(self, user, name, parent_dir_id, add_message):
        if self.owner == user:
            self.name = self.correct_name(name, parent_dir_id, lambda x: None, self.name) #Do not add messages
            self.save()
            add_message(f'Directory was renamed to {self.name}')

    def inc_download(self):
        Dir.objects.filter(pk=self.pk).update(downloads=models.F('downloads') + 1)

    def archieve_token(self):
        #TODO add oportunity to create zip/tar.xz/rar archives based on archive_type param
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
    def add_new(self, value, parent_dir_id, user, add_message):
        """Creating new record only if name is valid"""
        if len(value) > 30:
            add_message('Value should be no longer than 30 symbols')
        else:
            parent_dir = self.objects.get(pk=parent_dir_id)
            if value.lower() in list(map(lambda x: x.name.lower(), parent_dir.dirs.all())):
                add_message('A directory with that name already exists')
            else:
                instance = self(name=value, owner=user)
                instance.save()
                parent_dir.dirs.add(self.objects.get(pk=instance.id))

    @classmethod
    def correct_name(self, name, parent_dir_id, add_message, exclude=None):
        """Correcting name"""
        parent_dir = self.objects.get(pk=parent_dir_id)
        existing_names = list(map(lambda x: x.name.lower(), parent_dir.dirs.all().exclude(name=exclude)))
        if len(name) > 30 or name.lower() in existing_names:
            name_with_token = name[:21] + '_' + token_urlsafe()[:8]
            while name_with_token.lower() in existing_names:
                name_with_token = name[:21] + '_' + token_urlsafe()[:8]
            add_message(f'Directory {name} was renamed to {name_with_token}')
            return name_with_token
        return name

    @classmethod
    def upload(self, files, relpaths, parent_dir_id, user, add_message):
        paths = [path.split('/')[:-1] for path in relpaths]
        #file_dir_ids is a list of dir's ids where files located
        file_dir_ids = []
        
        dir_inst = self(name=self.correct_name(paths[0][0], parent_dir_id, add_message), owner=user)
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
                    dir_inst = self(name=self.correct_name(part, saved_id, add_message), owner=user)
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
            File.upload(the_file, file_dir_ids[id], user, add_message)


class File(models.Model):
    name = models.CharField(max_length=30)
    ext = models.CharField(max_length=10)
    file = models.FileField()
    downloads = models.IntegerField(default=0)
    created_date = models.DateTimeField(default=now, editable=False)
    mmtype = models.CharField(max_length=100, default='content/file')
    owner = models.ForeignKey('User', related_name='files', on_delete=models.CASCADE, default=1)

    @property
    def full_name(self):
        return f'{self.name}.{self.ext}'

    def __str__(self):
        return f'#{self.id} {self.name}.{self.ext}'
    
    def inc_download(self):
        File.objects.filter(pk=self.pk).update(downloads=models.F('downloads') + 1)
        Stats.objects.filter(pk=settings.STATS_ID).update(file_downloads=models.F('file_downloads') + 1)

    def safe_delete(self, user, add_message):
        if self.owner == user:
            self.delete()
            add_message(f'File {self.full_name} was removed')
    
    def safe_rename(self, user, name, parent_dir_id, add_message):
        if self.owner == user:
            self.name = self.correct_name(name, parent_dir_id, self.ext, lambda x: None, self.name) #Do not add messages
            self.save()
            add_message(f'File was renamed to {self.full_name}')

    @classmethod
    def correct_name(self, name, parent_dir_id, ext, add_message, exclude=None):
        """Correcting name"""
        parent_dir = Dir.objects.get(pk=parent_dir_id)
        existing_names = list(map(lambda x: (x.name + x.ext).lower(), parent_dir.files.all().exclude(name=exclude)))
        if len(name) > 30 or (name + ext).lower() in existing_names:
            name_with_token = name[:21] + '_' + token_urlsafe()[:8]
            while name_with_token.lower() in existing_names:
                name_with_token = name[:21] + '_' + token_urlsafe()[:8]
            add_message(f'File {name} was renamed to {name_with_token}.{ext}')
            return name_with_token
        return name
    
    @classmethod
    def upload(self, the_file, parent_dir_id, user, add_message):
        if the_file.size > settings.MAX_UPLOAD_SIZE:
            return add_message(f'{the_file.name} wasnt uploaded, its size more than {settings.MAX_UPLOAD_SIZE_LABEL}')

        last_dot_index = the_file.name.rfind('.')
        if len(the_file.name[last_dot_index + 1:]) > 10:
            return add_message(f'{the_file.name} wasnt uploaded, it has cumbersome extension')

        instance = self(
            file=the_file, 
            name=self.correct_name(the_file.name[:last_dot_index], parent_dir_id, the_file.name[last_dot_index + 1:], add_message),
            ext=the_file.name[last_dot_index + 1:],
            mmtype=the_file.content_type,
            owner=user
        )
        instance.save()
        parentDir = Dir.objects.get(pk=parent_dir_id)
        parentDir.files.add(self.objects.get(pk=instance.id))
        Stats.objects.filter(pk=settings.STATS_ID).update(file_uploads=models.F('file_uploads') + 1)


class Stats(models.Model):
    file_downloads = models.BigIntegerField(default=0)
    file_uploads = models.BigIntegerField(default=0)

    def __str__(self):
        return f'{self.id}'
  