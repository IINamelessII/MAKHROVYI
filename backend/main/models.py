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
    name = models.CharField(max_length=100)
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
        
        for the_dir in dir_record.dirs.all():
            next_dir_path = os.path.join(space, the_dir.name)
            os.mkdir(next_dir_path)
            self.prepare_dir(the_dir.id, next_dir_path)

    @classmethod
    def clear_archieve_data(self, token):
        archive_path = os.path.join(settings.ARCHIVES_ROOT, token)
        shutil.rmtree(archive_path)
        os.remove(archive_path + '.zip')


class File(models.Model):
    name = models.CharField(max_length=100)
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
