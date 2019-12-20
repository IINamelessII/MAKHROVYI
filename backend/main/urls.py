from django.urls import path, re_path
from main import views


urlpatterns = [
    path('', views.index, name='index'),
]
