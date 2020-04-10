# MAKHROVYI
New Palevo is comming...

### Deploying on your machine

`git clone https://github.com/IINamelessII/MAKHROVYI.git`

`cd MAKHROVYI`

edit `nginx/nginx_conf`

edit `backend/backend/local_settings.py`

edit `frontend/src/shared/constants.js`

`docker-compose build`

`docker-compose up -d`

`docker-compose run web python manage.py createsuperuser`

go to http://YOUR_IP_ADDRESS/admin/

authenticate using credentials created before

create instance of Stat

create instance of Social Application, (Google API)

create instance of Dir (root, for example)
