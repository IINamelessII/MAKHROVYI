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
    path('upload_files/<int:id>/', views.upload_files, name='upload_files'),
    path('newdir/', views.add_new_dir, name='add_new_dir'),
    path('upload_dir/<int:id>/', views.upload_dir, name='upload_dir'),
    path('messages/', views.messages, name='messages'),
    path('unset_message/<int:key>/', views.unset_message, name='unset_message'),
    path('user_info/', views.user_info, name='user_info'),
]
