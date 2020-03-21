from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from main import views


router = DefaultRouter()
router.register(r'dirs', views.DirViewSet)
router.register(r'files', views.FileViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('download/', views.download, name='download'),
    path('archive/', views.archive, name='archive'),
    path('archive_received/', views.archive_received, name='archive_received'),
    path('upload_file/<int:id>/', views.upload_file, name='upload_file'),
    path('newdir/', views.add_new_dir, name='add_new_dir'),
    path('upload_dir/<int:id>/', views.upload_dir, name='upload_dir'),
    re_path(r'^.*', views.index, name='index'), #All another urls served by front
]
