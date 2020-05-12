# MAKHROVYI
Service for free-to-everyone students solutions exchanges, where:

 - Everybody can download solutions as separated files or whole directories.

 - Everybody can upload files and create directories after authentication via Google Accounts.

## Tech Stack:

| Purpose | Tech |
| --------|------|
| Web Server | Django, Gunicorn, Nginx |
| REST API | Django REST Framework |
| SQL Database | PostgreSQL |
| Containerization | Docker |
| Task Queue | Celery |
|Task Worker | Redis |
| Frontend client | React.JS |
| Frontend state manager | Redux |
| Layout, Markup | HTML5, CSS3, CSS-modules |


### Deploying on your machine

1) run `git clone https://github.com/IINamelessII/MAKHROVYI.git && cd MAKHROVYI`

2) edit `.env`, `.env.db`, `nginx/nginx.conf`, `backend/backend/local_settings.py`, `frontend/src/shared/constants.js`

3) run `docker-compose up -d --build`

4) run `docker-compose run web python manage.py createsuperuser`

5) go to http[s]://YOUR_DOMAIN/admin/

6) authenticate using credentials created in step 4

7) create instance of Stat

8) create instance of Social Application, (Google API)

9) create instance of Dir (`root`, for example)

Enjoy your web app!
