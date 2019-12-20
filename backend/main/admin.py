from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from main.models import User, Instance


admin.site.register(User, UserAdmin)
admin.site.register(Instance)
