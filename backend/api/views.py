from django.shortcuts import render
from django.http import HttpResponse
from decouple import config
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import WeatherSerializer
import requests
from django.contrib.auth.models import User, Group
from rest_framework import status

# Create your views here.

API_KEY = config('API_KEY', default='')
base_location_url = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey="
base_forecast_url = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/"

serializer = WeatherSerializer()


class WeatherView(APIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    def get(self, request, city_name=None):
        if city_name:
            location_url = base_location_url + API_KEY + "&q={}".format(
                city_name)
            location_res = requests.get(location_url)
            city_key = location_res.json()[0]['Key']

            forecastUrl = base_forecast_url + city_key + "?apikey={}&details=true".format(
                API_KEY)
            forcast_data = requests.get(forecastUrl)
            print("forcast_data.__dict__")
            print(forcast_data.__dict__)
            result = WeatherSerializer(forcast_data, many=False).data
            return Response({
                "status": "success",
                "data": result
            },
                            status=status.HTTP_200_OK)


def index(request):
    return HttpResponse("Hello, world. You're at the lucid air index.")


# get the weather
def get_weather_info(request, city_name):
    location_url = base_location_url + API_KEY + "&q={}".format(city_name)
    location_res = requests.get(location_url)
    city_key = location_res.json()[0]['Key']

    forecastUrl = base_forecast_url + city_key + "?apikey={}&details=true".format(
        API_KEY)
    forcast_res = requests.get(forecastUrl)
    return HttpResponse(forcast_res)
