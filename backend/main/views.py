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

from main.decorators import load_data, post_only
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


@post_only
@load_data('id')
def download(request, data):
    """return file link by its id"""
    the_file_record = File.objects.get(pk=data['id'])
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
       

@post_only
@load_data('id')
def archive(request, data):
    """create archive from dir and return its link by dir's id"""
    the_dir_record = Dir.objects.get(pk=data['id'])
    #TODO add oportunity to create zip/tar.xz archives based on archive_type param
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
        

@post_only
@load_data('token')
def archive_received(request, data):
    """Removing archive with given token after 1 hour after creating"""
    time.sleep(settings.TIME_TO_DELETE)
    archive_path = os.path.join(settings.ARCHIVES_ROOT, data['token'])
    try:
        shutil.rmtree(archive_path)
        os.remove(archive_path + '.zip')
    except:
        return HttpResponse(status=404)
    return HttpResponse(status=200)


@post_only
def upload_file(request, id):
    """Upload file to dir with given id"""
    try:
        the_file = request.FILES['file']
        last_dot_index = the_file.name.rfind('.')
        instance = File(
            file=the_file, 
            name=the_file.name[:last_dot_index],
            ext=the_file.name[last_dot_index + 1:],
            mmtype=the_file.content_type,
        )
        instance.save()
        parentDir = Dir.objects.get(pk=id)
        parentDir.files.add(File.objects.get(pk=instance.id))
        return HttpResponse(status=200)
    except:
        return HttpResponse(status=401)


@post_only
@load_data('dirId', 'value')
def add_new_dir(request, data):
    """Add New Directory with given name to the directory with the given dirId"""
    instance = Dir(name=data['value'])
    instance.save()
    parentDir = Dir.objects.get(pk=data['dirId'])
    parentDir.dirs.add(Dir.objects.get(pk=instance.id))
    return HttpResponse(status=200)


@post_only
def upload_dir(request, id):
    """Upload dir to dir with given id"""
    files = request.FILES.getlist('file')
    relpaths = json.load(request.FILES['relPaths'].file)
    #TODO: Move this function to Dir model
    paths = [path.split('/')[:-1] for path in relpaths]
    #file_dir_ids is a list of dir's ids where files located
    file_dir_ids = []
    
    dir_inst = Dir(name=paths[0][0])
    dir_inst.save()
    d = [{
        dir_inst.id: {
            'name': dir_inst.name,
            'cont': []
        }
    }]
    Dir.objects.get(pk=id).dirs.add(Dir.objects.get(pk=dir_inst.id))
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
                dir_inst = Dir(name=part)
                dir_inst.save()
                Dir.objects.get(pk=saved_id).dirs.add(Dir.objects.get(pk=dir_inst.id))
                d_link.append({dir_inst.id: {
                    'name': part,
                    'cont': []
                }})
                d_link = d_link[-1][dir_inst.id]['cont']
                saved_id = dir_inst.id
        
        file_dir_ids.append(saved_id)
                    
    for id, the_file in enumerate(files):
        #Creating File record
        last_dot_index = the_file.name.rfind('.')
        instance = File(
            file=the_file, 
            name=the_file.name[:last_dot_index],
            ext=the_file.name[last_dot_index + 1:],
            mmtype=the_file.content_type,
        )
        instance.save()
        #Adding File to the parent Dir
        parent_dir = Dir.objects.get(pk=file_dir_ids[id])
        parent_dir.files.add(File.objects.get(pk=instance.id))

    return HttpResponse(status=200)


def messages(request):
    # request.session['messages'] = {0: 'Hello World', 22: 'WOW', 256: 'IT is cool!'}
    return HttpResponse(json.dumps(request.session['messages']))

def unset_message(request, key):
    del request.session['messages'][key]
    return HttpResponse(status=200)
