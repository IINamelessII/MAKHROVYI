#!/bin/sh

cd /code/frontend
npm install
npm run build

cd /code/backend

touch /code/backend/__init__.py
mkdir -p /code/backend/media/archives

python manage.py migrate
python manage.py collectstatic --no-input --clear
