#!/bin/sh

# The Dockerhub account where the images are stored
export DOCKERHUB_UNAME=noelbiggs28

# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export SECRET_KEY=$1
export DEBUG=$2
export POSTGRES_DB=$3
export POSTGRES_USER=$4
export POSTGRES_PASSWORD=$5
export NEW_VERSION=$6
export AWS_ACCESS_KEY_ID=$7
export AWS_SECRET_ACCESS_KEY=$8

docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec v2_dog_park-api-1 python /src/manage.py makemigrations 
docker exec v2_dog_park-api-1 python /src/manage.py migrate
docker exec -it v2_dog_park-api-1 python setup_data.py
docker exec -it v2_dog_park-api-1 python manage.py loaddata fixtures.json
# ./run-compose-prod.sh abc False db postgres postgres 1.1
