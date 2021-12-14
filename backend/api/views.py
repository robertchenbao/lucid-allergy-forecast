from django.shortcuts import render
from django.http import HttpResponse
from decouple import config

import requests

# Create your views here.

API_KEY = config('API_KEY', default='')
base_location_url = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey="
base_forecast_url = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/"


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
