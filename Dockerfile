FROM nikolaik/python-nodejs:latest

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code/backend
COPY requirements.txt /code/backend/
RUN pip install -r requirements.txt

WORKDIR /code/frontend
COPY ./frontend/package.json ./frontend/package-lock.json /code/frontend/
RUN npm install

COPY . /code/
RUN npm run build

RUN touch /code/backend/__init__.py
RUN mkdir -p /code/backend/media/archives

# COPY ./gunicorn.socket /etc/systemd/system/gunicorn.socket
# COPY ./gunicorn.service /etc/systemd/system/gunicorn.service
# RUN systemctl start gunicorn.socket
# RUN systemctl enable gunicorn.socket

COPY entrypoint.sh /code/entrypoint.sh
WORKDIR /code/backend
ENTRYPOINT ["/code/entrypoint.sh"]