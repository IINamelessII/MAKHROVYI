# MAKHROVYI
New Palevo is comming...

## Tech Stack:
later

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
