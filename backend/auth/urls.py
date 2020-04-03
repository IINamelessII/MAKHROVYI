from django.urls import path

from auth import views


urlpatterns = [
    path('user_data/', views.user_data, name='user_data'),
]
