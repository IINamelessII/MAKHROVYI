#!/bin/sh

# cd /code/frontend
# npm install
# npm run build

# cd /code/backend
python manage.py migrate
# python manage.py collectstatic --no-input --clear
