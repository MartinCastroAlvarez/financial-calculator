from rest_framework import serializers
from .models import Key


class KeySerializer(serializers.ModelSerializer):
    """

    Key serializer.

    """

    class Meta:
        model = Key
        fields = ("id", "title", "username", "password", "url", "description")
