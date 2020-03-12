import json
import os
import shutil
import time
import zipfile
from secrets import token_urlsafe
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from main.forms import UploadFileForm
from main.models import Dir, File
from main.permissions import IsReadOnly
from main.serializers import DirSerializer, FileSerializer


class DirViewSet(viewsets.ModelViewSet):
    """"API List of all dirs in system"""
    queryset = Dir.objects.all()
    serializer_class = DirSerializer
    permission_classes = (IsReadOnly,)


class FileViewSet(viewsets.ModelViewSet):
    """"API List of all files in system"""
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = (IsReadOnly,)


def index(request):
    """render SPA"""
    return render(request, 'index.html')


def download(request):
    """return file link by its id"""
    try:
        data = json.loads(request.body.decode('utf-8'))
        the_file_record = File.objects.get(pk=data['id'])
    except:
        return HttpResponse(status=404)
    else:
        filename = os.path.basename(the_file_record.file.name)
        response = HttpResponse(settings.MEDIA_URL + filename)
        response['Content-Disposition'] = 'attachment; filename={}'.format(filename)

        the_file_record.inc_download()
        return response


def prepare_dir(id, space):
    """"Recursive prepare dirs structure for archiving"""
    dir_record = Dir.objects.get(pk=id)
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
        prepare_dir(the_dir.id, next_dir_path)
       

def archive(request):
    """create archive from dir and return its link by dir's id"""
    try:
        data = json.loads(request.body.decode('utf-8'))
        the_dir_record = Dir.objects.get(pk=data['id'])
        #TODO add oportunity to create zip/tar.xz archives based on archive_type param
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

        shutil.make_archive(path_with_token, 'zip', path_with_token)

        response = HttpResponse(settings.ARCHIVES_URL + token + '.zip')
        response['Content-Disposition'] = 'attachment; filename={}'.format(token)
        
        return response
        

def archive_received(request):
    """Removing archive with given token after 1 hour after creating"""
    try:
        data = json.loads(request.body.decode('utf-8'))
        token = data['token']
    except:
        return HttpResponse(status=404)
    else:
        time.sleep(settings.TIME_TO_DELETE)
        archive_path = os.path.join(settings.ARCHIVES_ROOT, token)
        shutil.rmtree(archive_path)
        os.remove(archive_path + '.zip')
        return HttpResponse(status=200)


def upload_file(request):
    if request.method == 'POST':
        try:
            #TODO: RECEIVE location (inherit dir)
            the_file = request.FILES['file']
            last_dot_index = the_file.name.rfind('.')
            instance = File(
                file=the_file, 
                name=the_file.name[:last_dot_index],
                ext=the_file.name[last_dot_index + 1:],
                mmtype=the_file.content_type,
            )
            instance.save()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=401)
    else:
        return HttpResponse(status=400)