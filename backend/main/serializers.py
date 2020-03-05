from main.models import Dir, File
from rest_framework import serializers


class DirSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dir
        fields = ('id', 'name', 'dirs', 'files')


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('id', 'name', 'ext')
