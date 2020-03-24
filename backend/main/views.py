import json
import os
import shutil
import time
# import zipfile
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


def add_message_to_session(request, message):
    i = 0

    if 'messages' in request.session:
        while i in request.session['messages']:
            i += 1
    else:
        request.session['messages'] = dict()

    request.session.modified = True
    request.session['messages'][i] = message
    return request


def messages(request):
    return HttpResponse(json.dumps(request.session.get('messages', dict())), status=200)


def unset_message(request, key):
    request.session.modified = True
    del request.session['messages'][str(key)]
    return HttpResponse(status=200)


def index(request):
    """render SPA"""
    return render(request, 'index.html')


@post_only
@load_data('id')
def download(request, data):
    """return file link by its id"""
    the_file = File.objects.get(pk=data['id'])
    response = HttpResponse(settings.MEDIA_URL + the_file.file.name)
    response['Content-Disposition'] = f'attachment; filename={the_file.full_name}'

    the_file.inc_download()
    return response

       
@post_only
@load_data('id')
def archive(request, data):
    """create archive from dir and return its link by dir's id"""
    token = Dir.objects.get(pk=data['id']).archieve_token()
    response = HttpResponse(settings.ARCHIVES_URL + token + '.zip')
    response['Content-Disposition'] = 'attachment; filename={}'.format(token)

    return response
        

@post_only
@load_data('token')
def archive_received(request, data):
    """Removing archive with given token after receiving it on cliend side"""
    time.sleep(settings.TIME_TO_DELETE)
    try:
        Dir.clear_archieve_data(data['token'])
    except:
        return HttpResponse(status=404)
    return HttpResponse(status=200)


@post_only
def upload_file(request, id):
    """Upload file to dir with given id"""
    try:
        File.upload(request.FILES['file'], id)
    except:
        return HttpResponse(status=401)
    return HttpResponse(status=200)


@post_only
@load_data('dirId', 'value')
def add_new_dir(request, data):
    """Add New Directory with given name to the directory with the given dirId"""
    Dir.add_new(data['value'], data['dirId'], lambda msg: add_message_to_session(request, msg))
    return HttpResponse(status=200)


@post_only
def upload_dir(request, id):
    """Upload dir to dir with given id"""
    # try:
    Dir.upload(request.FILES.getlist('file'), json.load(request.FILES['relPaths'].file), id, lambda msg: add_message_to_session(request, msg))
    # except:
    #     return HttpResponse(status=401)
    return HttpResponse(status=200)
