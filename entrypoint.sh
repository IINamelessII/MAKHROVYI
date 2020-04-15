#!/bin/sh

echo "Waiting for postgres..."
sleep 10
echo "PostgreSQL started"

python manage.py migrate
python manage.py collectstatic --no-input

exec "$@"