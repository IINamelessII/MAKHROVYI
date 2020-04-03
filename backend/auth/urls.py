from django.urls import include, path, re_path

from auth import views


urlpatterns = [
    path('user_data/', views.user_data, name='user_data'),
    path('google/login/', views.google_login, name='google_login'),
]
