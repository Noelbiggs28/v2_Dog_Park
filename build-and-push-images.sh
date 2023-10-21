#!/bin/bash

##############################
# This builds and pushes both the nginx/React image
# and the DRF one.  
#
# The nginx/React image gets built with an environment variable
# that sets the url of the DRF backend REACT_APP_BASE_URL.  Once you
# know the IP address of your EC2 instance, you would pass that in
# instead of localhost
##############################

DOCKERHUB_UNAME=noelbiggs28

BASE_URL=$1
NEW_VERSION=$2

docker buildx build --platform linux/amd64 --build-arg VITE_BASE_URL=$BASE_URL -t $DOCKERHUB_UNAME/dog-park-frontend:$NEW_VERSION -f webserver/Dockerfile . --no-cache --push
# docker push $DOCKERHUB_UNAME/webserver-prod:$NEW_VERSION

docker buildx build --platform linux/amd64  -t $DOCKERHUB_UNAME/dog-park-backend:$NEW_VERSION -f dog_park_backend/Dockerfile ./dog_park_backend --no-cache --push
# docker push $DOCKERHUB_UNAME/api-prod:$NEW_VERSION

# ./build-and-push-images.sh http://54.198.184.220/api/ 1.1