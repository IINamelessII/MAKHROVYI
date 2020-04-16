FROM nikolaik/python-nodejs:latest

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code/backend
COPY requirements.txt /code/backend/
RUN pip install -r requirements.txt

WORKDIR /code/frontend
COPY ./frontend/package.json ./frontend/package-lock.json /code/frontend/
RUN npm install

ADD . /code/
RUN npm run build

WORKDIR /code/backend
RUN mkdir -p /code/backend/media/archives