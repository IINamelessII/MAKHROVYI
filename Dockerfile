FROM nikolaik/python-nodejs:latest

WORKDIR /code/backend
COPY requirements.txt /code/backend/
RUN pip install -r requirements.txt

WORKDIR /code/frontend
COPY ./frontend/package.json ./frontend/package-lock.json /code/frontend/

RUN touch /code/backend/__init__.py
RUN mkdir -p /code/backend/media/archives

COPY ./gunicorn.socket /etc/systemd/system/gunicorn.socket
COPY ./gunicorn.service /etc/systemd/system/gunicorn.service
RUN systemctl start gunicorn.socket
RUN systemctl enable gunicorn.socket

WORKDIR /code/backend

EXPOSE 8000