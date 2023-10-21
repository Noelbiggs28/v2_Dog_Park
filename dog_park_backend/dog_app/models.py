from django.db import models
from django.contrib.auth.models import User
from trait_app.models import Trait
# Create your models here.
class Dog(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.TextField(max_length=20)
    age = models.IntegerField()
    description= models.TextField()
    traits = models.ManyToManyField(Trait, related_name="has_trait", blank=True)
    dislikes = models.ManyToManyField(Trait, related_name="dislikes_the_trait", blank = True)
    picture = models.FileField(upload_to="dog_pics/", blank=True, null=True)