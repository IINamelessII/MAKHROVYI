import os

from celery import shared_task
from django.conf import settings


@shared_task
def remove_archive(token):
    try:
        os.remove(os.path.join(settings.ARCHIVES_ROOT, token + '.zip'))
    except:
        pass
    
    return
