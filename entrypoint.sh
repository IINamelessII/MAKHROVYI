#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z $SQL_HOST $SQL_PORT; do
    sleep 0.1
done

echo "PostgreSQL started"

cd /code/frontend
npm install
npm run build

cd /code/backend
python manage.py migrate
python manage.py collectstatic --no-input --clear

exec "$@"