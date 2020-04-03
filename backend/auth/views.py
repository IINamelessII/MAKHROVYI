import json

from django.http import HttpResponse
from django.shortcuts import redirect, render

from main.views import add_message_to_session


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


def google_login(request):
    request.session.modified = True

    if 'auth-requests' in request.session:
        if request.session['auth-requests'] < 19:
            request.session['auth-requests'] += 1
            return redirect('/accounts/google/login/')
    else:
        request.session['auth-requests'] = 1
        return redirect('/accounts/google/login/')
    
    add_message_to_session(request, 'Too many login requests!')
