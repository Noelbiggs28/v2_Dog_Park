from django.db import models
from dog_app.models import Dog


class DogPark(models.Model):
    dog_park_name = models.CharField(max_length=55)
    dogs = models.ManyToManyField(Dog, blank=True)