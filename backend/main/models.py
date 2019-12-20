from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Instance(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, max_length=300)
    file = models.FileField()
    #TODO add serving filenames, exclude situations when 
    #different files have same filenames

    def __str__(self):
        return '#{} {}'.format(self.id, self.name)
