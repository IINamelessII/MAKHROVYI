from django.shortcuts import render
from main.models import Instance


def index(request):
    return render(request, 'index.html')
