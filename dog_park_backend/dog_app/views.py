
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


from django.shortcuts import get_object_or_404
from .models import Dog
from .serializers import DogSerializer

class DogView(APIView): 

    def get(self, request, pk=None):
        if pk is not None:
            dog = get_object_or_404(Dog, pk=pk)
            serializer = DogSerializer(dog)
        else:
            dogs = Dog.objects.filter(owner=request.user).order_by("pk")
            serializer = DogSerializer(dogs, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = DogSerializer(data=request.data)
        # check for valid data
        if serializer.is_valid():
            # set owner to user
            serializer.validated_data['owner'] = request.user
            # save dog to db
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        # get dog that was clicked on
        dog = get_object_or_404(Dog, pk=pk) 
        serializer = DogSerializer(dog, data=request.data, partial=True)
        # check what parameters were included in request
        # set the dogs attributes to the request. if not found does current
        if serializer.is_valid():
            if 'age' in request.data:
                dog.age =request.data.get('age',dog.age)
            if 'name' in request.data:
                dog.name = request.data.get('name',dog.name)
            if 'description' in request.data:
                dog.description= request.data.get('description',dog.description)
            dog.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        dog = get_object_or_404(Dog, pk=pk)
        dog.delete()
        return Response('dog was deleted')