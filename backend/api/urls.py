from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('weather/<str:city_name>',
         views.get_weather_info,
         name='weather info'),
    path('admin/', admin.site.urls),
]