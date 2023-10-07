from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import DogPark
from .serializers import DogParkSerializer
from dog_app.models import Dog
class DogParkView(APIView):

    def get(self, request, pk=None):
        if pk is not None:
            dog_park = get_object_or_404(DogPark, pk=pk)
            serializer = DogParkSerializer(dog_park)
        else:
            dog_park = DogPark.objects.order_by("pk")
            serializer = DogParkSerializer(dog_park, many=True)
        return Response(serializer.data)
    
    def patch(self, request, pk=None):
        # get dogs owned by user
        user_dogs = Dog.objects.filter(owner=request.user)
        # get park that was clicked
        if pk:
            dog_park = get_object_or_404(DogPark, pk=pk)
        # if clicked from myprofile
        else:
            dog_park = DogPark.objects.filter(dogs__in=user_dogs).first()
            # if dogs not in parks end function before errors
            if not dog_park:
                return Response("No dogs to remove", status=status.HTTP_200_OK)
            
        # check if adding dogs to park or removing
        if request.data['function']=="add":
            # if adding check if dogs are already in another park and remove them
            current_park = DogPark.objects.filter(dogs__in=user_dogs).first()
            if current_park and current_park != dog_park:
                current_park.dogs.remove(*user_dogs)
            # add dogs to park
            dog_park.dogs.add(*user_dogs)
            return Response("Dogs added to the park successfully.", status=status.HTTP_200_OK)
        elif request.data['function']=="remove":
            # remove dogs from park
            dog_park.dogs.remove(*user_dogs)
            return Response("Dogs removed from the park successfully.", status=status.HTTP_200_OK)