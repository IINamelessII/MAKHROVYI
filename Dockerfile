FROM nikolaik/python-nodejs:latest

WORKDIR /code/backend
COPY requirements.txt /code/backend/
RUN pip install -r requirements.txt

WORKDIR /code/frontend
COPY ./frontend/package.json ./frontend/package-lock.json /code/frontend/

WORKDIR /code/backend
RUN touch /code/backend/__init__.py
RUN mkdir -p /code/backend/media/archives

EXPOSE 8000