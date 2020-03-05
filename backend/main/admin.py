from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from main.models import User, Dir, File


admin.site.register(User, UserAdmin)
admin.site.register(Dir)
admin.site.register(File)
