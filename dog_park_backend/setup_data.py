# exec(open("./setup_data.py").read())

from park_app.models import Dog_Park

Dog_Park.objects.create(dog_park_name="Mililani")
Dog_Park.objects.create(dog_park_name="Waipahu")
Dog_Park.objects.create(dog_park_name="Honolulu")