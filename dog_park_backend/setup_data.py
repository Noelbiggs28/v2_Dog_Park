# docker exec -it v2_dog_park-api-1 python setup_data.py
# locally
# docker exec -it dog_park_backend-api-1 python setup_data.py
import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dog_park_proj.settings")

# Initialize Django
django.setup()
# import DogPark
from park_app.models import DogPark
from trait_app.models import Trait
# deletes all dogParks
DogPark.objects.all().delete()

# list of all dog park names on oahu
# park_names = ["Mililani", "Waipahu", "Honolulu", "Wheeler", "Central O'ahu", "Pearl City Peninsula", "Ford Island", "Moanalua", "Forest City", "Hoalauna","Ala Wai", "Radford Terrace"]
# # loops through names
# for park in park_names:
#     # attempts to grab park from database
#     existing_park = DogPark.objects.filter(dog_park_name=park).first()
#     # if it doesnt exist it creates it.
#     if not existing_park:
#         DogPark.objects.create(dog_park_name=park)
# traits = ["Friendly","Aggresive", "Small Dog", "Large dog"]
# for trait in traits:
#     existing_trait = Trait.objects.filter(name = trait).first()
#     if not existing_trait:
#         Trait.objects.create(name=trait)