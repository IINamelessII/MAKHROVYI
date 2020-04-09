FROM nikolaik/python-nodejs:latest

WORKDIR /code/backend
COPY requirements.txt /code/backend/
RUN pip install -r requirements.txt

WORKDIR /code/frontend
COPY ./frontend/package.json ./frontend/package-lock.json /code/frontend/

WORKDIR /code/backend
RUN touch /code/backend/__init__.py
RUN mkdir -p /code/backend/media/archives

COPY /code/gunicorn.socket /etc/systemd/system/gunicorn.socket
COPY /code/gunicorn.service /etc/systemd/system/gunicorn.service
RUN systemctl start gunicorn.socket
RUN systemctl enable gunicorn.socket

EXPOSE 8000