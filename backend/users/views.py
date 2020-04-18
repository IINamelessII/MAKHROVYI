import json

from django.http import HttpResponse


def user_data(request):
    """Return cureent user photo and id if user is authenticated via OAuth"""
    if hasattr(request.user, 'socialaccount_set') and len(request.user.socialaccount_set.all()):
        data = {
            'photo': request.user.socialaccount_set.all()[0].extra_data['picture'],
            'id': request.user.id,
        }
    else:
        data = None

    return HttpResponse(json.dumps(data), status=200)
