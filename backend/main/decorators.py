import json
from django.http import HttpResponse


def load_data(*keys):
    def load_data_decorator(func):
        def load_data_wrapper(request, *args, **kwargs):
            try:
                raw = json.loads(request.body.decode('utf-8'))
                data = dict()
                for key in keys:
                    data[key] = raw[key]
            except:
                return HttpResponse(status=400)
            else:
                return func(request, data, *args, **kwargs)
        return load_data_wrapper
    return load_data_decorator


def post_only(func):
    def post_only_wrapper(request, *args, **kwargs):
        if request.method == 'POST':
            return func(request, *args, **kwargs)
        else:
            return HttpResponse(status=403)
    return post_only_wrapper
