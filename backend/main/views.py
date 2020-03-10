import json
import os
import shutil
import zipfile
from secrets import token_urlsafe
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from main.models import Dir, File
from main.serializers import DirSerializer, FileSerializer
from main.permissions import IsReadOnly


class DirViewSet(viewsets.ModelViewSet):
    """"List of all dirs in system"""
    queryset = Dir.objects.all()
    serializer_class = DirSerializer
    permission_classes = (IsReadOnly,)


class FileViewSet(viewsets.ModelViewSet):
    """"List of all files in system"""
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = (IsReadOnly,)


def index(request):
    """render SPA"""
    return render(request, 'index.html')


def download(request):
    """return file link by its id"""
    #TODO add custom exceptions and different responses
    try:
        data = json.loads(request.body.decode('utf-8'))
        the_file_record = File.objects.get(pk=data['id'])
    except:
        return HttpResponse(status=404)
    else:
        filename = os.path.basename(the_file_record.file.name)
        response = HttpResponse(settings.MEDIA_URL + filename)
        response['Content-Disposition'] = 'attachment; filename={}'.format(filename)
        return response


def prepare_dir(id, space):
    dir_record = Dir.objects.get(pk=id)
    files = list(map(lambda x: x.id, dir_record.files.all()))
    dirs = list(map(lambda x: x.id, dir_record.dirs.all()))

    for file_id in files:
        the_file = File.objects.get(pk=file_id)
        filename = os.path.basename(the_file.file.name)

        file_path = os.path.join(settings.MEDIA_ROOT, filename)
        new_path = os.path.join(space, filename)

        shutil.copy(file_path, new_path)
    
    for dir_id in dirs:
        the_dir = Dir.objects.get(pk=dir_id)
        next_dir_path = os.path.join(space, the_dir.name)
        os.mkdir(next_dir_path)
        prepare_dir(dir_id, next_dir_path)
       

def archive(request):
    """create archive from dir and return its link by dir's id"""
    #TODO add oportunity to create zip/tar.xz archives based on archive_type param
    try:
        data = json.loads(request.body.decode('utf-8'))
        the_dir_record = Dir.objects.get(pk=data['id'])
    except:
        return HttpResponse(status=404)
    else:
        token = token_urlsafe(16)
        path_with_token = os.path.join(settings.ARCHIVES_ROOT, token)
        while os.path.exists(path_with_token):
            token = token_urlsafe(16)
            path_with_token = os.path.join(settings.ARCHIVES_ROOT, token)
        
        os.mkdir(path_with_token)
    
        prepare_dir(data['id'], path_with_token)

        # archive_path = os.path.join(path_with_token, the_dir_record.name)
        shutil.make_archive(path_with_token, 'zip', path_with_token)
        #TODO: Add view to remove archive, request send from front after downloading

        response = HttpResponse(settings.ARCHIVES_URL + token + '.zip')
        response['Content-Disposition'] = 'attachment; filename={}'.format(token)
        return response