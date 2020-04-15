FROM nikolaik/python-nodejs:latest

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV SQL_HOST db
ENV SQL_PORT 5432
ENV DATABASE postgres

WORKDIR /code/backend
COPY requirements.txt /code/backend/
RUN pip install -r requirements.txt

WORKDIR /code/frontend
COPY ./frontend/package.json ./frontend/package-lock.json /code/frontend/
RUN npm install

ADD frontend /code/
RUN npm run build

WORKDIR /code/backend
ADD backend /code/
RUN mkdir -p /code/backend/media/archives

COPY entrypoint.sh /code/entrypoint.sh

ENTRYPOINT /code/entrypoint.sh
