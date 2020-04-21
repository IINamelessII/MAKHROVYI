import json

from django.http import HttpResponse


def user_data(request):
    # return HttpResponse(json.dumps({'photo': 'https://via.placeholder.com/150', 'id': 1, 'name': 'debug'}), status=200) #DEBUGONLY
    """Return cureent user photo and id if user is authenticated via OAuth"""
    if hasattr(request.user, 'socialaccount_set') and len(request.user.socialaccount_set.all()):
        data = {
            'photo': request.user.socialaccount_set.all()[0].extra_data['picture'],
            'id': request.user.id,
            'name': request.user.username,
        }
    else:
        data = None

    return HttpResponse(json.dumps(data), status=200)
