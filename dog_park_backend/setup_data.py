# exec(open("./setup_data.py").read())
import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dog_park_proj.settings")

# Initialize Django
django.setup()
from park_app.models import DogPark
DogPark.objects.all().delete()
park_names = ["Mililani", "Waipahu", "Honolulu"]
for park in park_names:
    existing_park = DogPark.objects.filter(dog_park_name=park).first()
    DogPark.objects.create(dog_park_name=park)
