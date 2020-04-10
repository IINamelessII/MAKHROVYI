from django.urls import path

from users import views


urlpatterns = [
    path('user_data/', views.user_data, name='user_data'),
]
