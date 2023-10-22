export AWS_ACCESS_KEY_ID=$1

export AWS_SECRET_ACCESS_KEY=$2


docker-compose up -d --build

# make sure the postgres container is ready, then run migrations
sleep 5
docker exec dog_park_backend-api-1 python /src/manage.py makemigrations 
docker exec dog_park_backend-api-1 python /src/manage.py migrate

# includes set up data
docker exec -it dog_park_backend-api-1 python manage.py loaddata fixtures.json

# this one, i need better comments 
# COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker-compose up -d
# sleep 10
# docker exec dog_park_backend-api-1 python manage.py migrate



# docker stop $(docker ps -q)
# docker rm $(docker ps -aq)
# docker rmi $(docker images -q)


# python manage.py loaddata fixtures.json