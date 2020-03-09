import json
import os
# import mimetypes
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
# from wsgiref.util import FileWrapper
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
    """get file link by its id"""
    pass
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
