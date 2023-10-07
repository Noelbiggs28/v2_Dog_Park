from rest_framework import serializers
from .models import DogPark
from dog_app.models import Dog

class DogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dog
        fields = '__all__'

class DogParkSerializer(serializers.ModelSerializer):
    dogs = DogSerializer(many=True) 
    class Meta:
        model = DogPark
        fields = '__all__'