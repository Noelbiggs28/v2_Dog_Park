from rest_framework import serializers
from .models import Dog

from trait_app.models import Trait

class TraitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trait
        fields = '__all__'


class DogViewSerializer(serializers.ModelSerializer):
    traits = TraitSerializer(many=True, read_only=True)
    dislikes = TraitSerializer(many=True, read_only=True)
    class Meta:
        model = Dog
        fields = '__all__'
        read_only_fields = ['owner'] 


class DogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dog
        fields = '__all__'
        read_only_fields = ['owner'] 
