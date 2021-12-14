from django.shortcuts import render
from django.http import HttpResponse

import requests

# Create your views here.

apikey = "FbHh01xGcDPd2YOkrGjAZxEUAz1SebiM"
base_location_url = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey="
base_forecast_url = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/"


def index(request):
    return HttpResponse("Hello, world. You're at the lucid air index.")


# get the weather
def get_weather_info(request, city_name):
    location_url = base_location_url + apikey + "&q={}".format(city_name)
    location_res = requests.get(location_url)
    city_key = location_res.json()[0]['Key']

    forecastUrl = base_forecast_url + city_key + "?apikey={}&details=true".format(
        apikey)
    forcast_res = requests.get(forecastUrl)
    return HttpResponse(forcast_res)
