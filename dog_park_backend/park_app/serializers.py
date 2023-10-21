from rest_framework import serializers
from .models import DogPark
from dog_app.models import Dog
from trait_app.models import Trait
class TraitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trait
        fields = '__all__'


class DogSerializer(serializers.ModelSerializer):
    traits = TraitSerializer(many=True)
    dislikes = TraitSerializer(many=True)
    class Meta:
        model = Dog
        fields = '__all__'

class DogParkSerializer(serializers.ModelSerializer):
    dogs = DogSerializer(many=True) 
    class Meta:
        model = DogPark
        fields = '__all__'