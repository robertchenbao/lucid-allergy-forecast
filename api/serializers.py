from django.contrib.auth.models import User, Group
from rest_framework import serializers


class WeatherSerializer(serializers.Serializer):
    dir(serializers.Serializer)
    _content = serializers.JSONField()

    class Meta:
        # the only field is content
        fields = ("_content")
        validators = []
