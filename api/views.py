from django.shortcuts import render
from django.http import HttpResponse
from decouple import config
from rest_framework.views import APIView
from rest_framework.response import Response
import os
import logging
from .serializers import WeatherSerializer
import requests
from django.contrib.auth.models import User, Group
from rest_framework import status
from django.conf import settings
from django.views.generic import View

# The views for the Django app

API_KEY = config('API_KEY', default='')
base_location_url = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey="
base_forecast_url = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/"


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    build`).
    """
    index_file_path = os.path.join(settings.REACT_APP_DIR, 'build',
                                   'index.html')

    def get(self, request):
        try:
            with open(self.index_file_path) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead after
                running `yarn start` on the frontend/ directory
                """,
                status=501,
            )


# return weather forcast for a city
class WeatherView(APIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    def get(self, request, city_name=None):
        if city_name:
            location_url = base_location_url + API_KEY + "&q={}".format(
                city_name)
            location_data = requests.get(location_url).json()
            # print("location_data::")
            # print(location_data)
            if len(location_data) == 0:
                # TODO: handle "city not found" problem here
                pass
            city_key = location_data[0]['Key']

            forecastUrl = base_forecast_url + city_key + "?apikey={}&details=true".format(
                API_KEY)
            forcast_data = requests.get(forecastUrl)
            forcast_res = WeatherSerializer(forcast_data, many=False).data
            return Response(
                {
                    "status":
                    "success",
                    "data":
                    forcast_res,
                    "EnglishName":
                    location_data[0]['EnglishName'],
                    "AdministrativeArea":
                    location_data[0]['AdministrativeArea']['EnglishName']
                },
                status=status.HTTP_200_OK)


# testing index endpoint
def index(request):
    return HttpResponse("Hello, world. You're at the lucid air index.")
