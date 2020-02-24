import json
import os
import mimetypes
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from wsgiref.util import FileWrapper
from main.models import Instance
from main.serializers import InstanceSerializer
from main.permissions import IsReadOnly


class InstanceViewSet(viewsets.ModelViewSet):
    """"List of all instances in system"""
    queryset = Instance.objects.all()
    serializer_class = InstanceSerializer
    permission_classes = (IsReadOnly,)


def index(request):
    """render SPA"""
    return render(request, 'index.html')


def download(request):
    """download instance file by its id"""
    #TODO add custom exceptions and different responses
    try:
        data = json.loads(request.body.decode('utf-8'))
        instance = Instance.objects.get(pk=data['id'])
    except:
        return HttpResponse(status=404)
    else:
        file_path = os.path.join(settings.MEDIA_ROOT, instance.file.name)
        file_wrapper = FileWrapper(open(file_path,'rb'))
        file_mimetype = mimetypes.guess_type(file_path)
        response = HttpResponse(file_wrapper, content_type=file_mimetype )
        response['X-Sendfile'] = file_path
        response['Content-Length'] = os.stat(file_path).st_size
        response['Content-Disposition'] = 'attachment; filename=%s' % instance.file.name
        return response
        # file_path = os.path.join(settings.MEDIA_ROOT, instance.file.name)
        # with open(file_path, 'rb') as f:
        #     response = HttpResponse(f.read(), content_type="application/vnd.ms-excel")
        #     response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
        #     return response