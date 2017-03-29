from rest_framework import serializers
from .models import Quote


class QuoteSerializer(serializers.ModelSerializer):
    """

    Quote serializer.

    """

    class Meta:
        model = Quote
        fields = ("id", "text", "author")
