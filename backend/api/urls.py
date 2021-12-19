from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'weather', views.WeatherViewSet, basename="weather")

urlpatterns = [
    path('', views.index, name='index'),
    path('weather/<str:city_name>',
         views.WeatherView.as_view(),
         name='weather info'),
    path('admin/', admin.site.urls),
]