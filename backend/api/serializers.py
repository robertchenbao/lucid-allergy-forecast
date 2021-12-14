from django.contrib.auth.models import User, Group
from rest_framework import serializers


class WeatherSerializer(serializers.Serializer):
    print("stuff")
    dir(serializers.Serializer)
    _content = serializers.JSONField()

    class Meta:
        # Each room only has one event per day.
        fields = ("_content")
        validators = []
