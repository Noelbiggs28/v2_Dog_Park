FROM python:3.11-buster

WORKDIR /src

COPY ./requirements.txt .

RUN pip install -r requirements.txt

# This will allow you to pass in credentials.
# The default values are for local development
# but can override these when you run the container.
# It's not completely secure, but good enough.
# ENV SECRET_KEY=abc123
# ENV DEBUG=True
# ENV DB_NAME=dog_park_backend-db
# ENV DB_USER=postgres
# ENV DB_PASS=postgres

COPY . .

CMD gunicorn --bind 0.0.0.0:8000 --workers 3 dog_park_proj.wsgi:application
