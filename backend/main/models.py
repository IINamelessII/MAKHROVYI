from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Dir(models.Model):
    name = models.CharField(max_length=100)
    dirs = models.ManyToManyField('Dir', blank=True)
    files = models.ManyToManyField('File', blank=True)

    def __str__(self):
        return '#{} {}'.format(self.id, self.name)


class File(models.Model):
    name = models.CharField(max_length=100)
    ext = models.CharField(max_length=10)
    file = models.FileField()

    def __str__(self):
        return '#{} {}'.format(self.id, self.name, '.', self.ext)