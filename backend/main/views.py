import json
import os
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
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
        instance = Instance.get(pk=data['id'])
    except:
        return HttpResponse(status=404)
    else:
        file_path = os.path.join(settings.MEDIA_ROOT, instance.file.name)
        with open(file_path, 'rb') as f:
            response = HttpResponse(f.read(), content_type="application/vnd.ms-excel")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
