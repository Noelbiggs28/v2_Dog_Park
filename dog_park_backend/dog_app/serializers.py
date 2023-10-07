from rest_framework import serializers
from .models import Dog
from park_app.models import DogPark


class DogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dog
        fields = '__all__'
        read_only_fields = ['owner'] 
