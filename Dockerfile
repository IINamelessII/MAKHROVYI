FROM nikolaik/python-nodejs:latest

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# WORKDIR /code/backend
RUN pip install -r /code/requirements.txt


# COPY entrypoint.sh /code/entrypoint.sh
WORKDIR /code/backend
ENTRYPOINT ["/code/entrypoint.sh"]