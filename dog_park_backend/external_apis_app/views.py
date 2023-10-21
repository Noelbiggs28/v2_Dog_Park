
import requests
from rest_framework.views import APIView
from rest_framework.response import Response




class WeatherView(APIView): 

    def get(self, request, pk=None):           
            endpoint="https://api.open-meteo.com/v1/forecast?latitude=21.4389&longitude=158.0001&current=temperature_2m,precipitation&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FAnchorage&forecast_days=1"
            response = requests.get(endpoint)
            
            if response.status_code == 200:
                apiJSON = response.json()
                return Response(apiJSON)
            else:
                # Handle the case where the API request failed
                return Response({"error": "Failed to fetch weather data"}, status=response.status_code)
            
    
        