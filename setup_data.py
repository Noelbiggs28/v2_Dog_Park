# exec(open("./setup_data.py").read())

from dog_park_backend.park_app.models import Dog_Park

Dog_Park.objects.create(dog_park_name="Wood Shavings")
Dog_Park.objects.create(dog_park_name="Apple Muffins")
Dog_Park.objects.create(dog_park_name="Trails")