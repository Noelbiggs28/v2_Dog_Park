from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Dog(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.TextField(max_length=20)
    age = models.IntegerField()
    description= models.TextField()