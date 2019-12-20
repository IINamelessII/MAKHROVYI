from django.shortcuts import render
from rest_framework import viewsets
from main.models import Instance
from main.serializers import InstanceSerializer
from main.permissions import IsReadOnly


class InstanceViewSet(viewsets.ModelViewSet):
    "List of all instances in system"
    queryset = Instance.objects.all()
    serializer_class = InstanceSerializer
    permission_classes = (IsReadOnly,)


def index(request):
    return render(request, 'index.html')
