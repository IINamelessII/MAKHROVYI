# MAKHROVYI
Service for free-to-everyone students solutions exchanges, where:

 - Everybody can download solutions as separated files or whole directories.

 - Everybody can upload files and create directories after authentication.

## Tech Stack:

| Purpose | Tech |
| --------|------|
| Web Server | Django, Gunicorn, Nginx |
| REST API | Django REST Framework |
| SQL Database | PostgreSQL |
| Containerization | Docker |
| VPS | DigitalOcean |
| Task Queue | Celery |
|Task Worker | Redis |
| Frontend client | React.JS |
| Frontend state manager | Redux |
| Layout, Markup | HTML5, CSS3, CSS-modules |


### Deploying on your machine

`git clone https://github.com/IINamelessII/MAKHROVYI.git`

`cd MAKHROVYI`

edit `.env`, `.env.db`, `nginx/nginx.conf`, `backend/backend/local_settings.py`, `frontend/src/shared/constants.js`

`docker-compose up -d --build`

`docker-compose run web python manage.py createsuperuser`

go to http[s]://YOUR_DOMAIN/admin/

authenticate using credentials created before

create instance of Stat

create instance of Social Application, (Google API)

create instance of Dir (`root`, for example)

Enjoy your web app!
