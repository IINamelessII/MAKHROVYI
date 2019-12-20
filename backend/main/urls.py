from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from main import views


router = DefaultRouter()
router.register(r'instances', views.InstanceViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', views.index, name='index'),
    path('download/', views.download, name='download'),
]
