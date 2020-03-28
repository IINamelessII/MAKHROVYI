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
    path('unset_message/', views.unset_message, name='unset_message'),
    path('user_data/', views.user_data, name='user_data'),
    path('remove_dir/', views.remove_dir, name='remove_dir'),
    path('rename_dir/', views.rename_dir, name='rename_dir'),
    path('remove_file/', views.remove_file, name='remove_file'),
    path('rename_file/', views.rename_file, name='rename_file'),
    path('stats/', views.stats, name='stats'),
]
