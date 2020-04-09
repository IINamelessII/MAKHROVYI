# MAKHROVYI
New Palevo is comming...

### Deploying on your machine

`git clone https://github.com/IINamelessII/MAKHROVYI.git`

`cd MAKHROVYI`

`edit nginx/nginx_conf`

`docker-compose build`

`docker-compose up -d`

`docker-compose run nginx vi /etc/nginx/nginx.conf`

and Add this to the http{} area
`client_max_body_size 20M;`

`docker-compose run web python manage.py createsuperuser`

go to [http://locahost:8000/admin/](http://locahost:8000/admin/)

authenticate using credentials created before

create instance of Stat

create instance of Social Application, (Google API)

create instance of Dir (root, for example)
