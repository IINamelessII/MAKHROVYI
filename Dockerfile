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

COPY entrypoint.sh /code/entrypoint.sh
WORKDIR /code/backend
ENTRYPOINT ["/code/entrypoint.sh"]