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


class File(models.Model):
    name = models.CharField(max_length=100)
    ext = models.CharField(max_length=10)
    file = models.FileField()
    downloads = models.IntegerField(default=0)
    created_date = models.DateTimeField(default=now, editable=False)

    def __str__(self):
        return '#{} {}'.format(self.id, self.name, '.', self.ext)
    
    def inc_download(self):
        File.objects.filter(pk=self.pk).update(downloads=models.F('downloads') + 1)