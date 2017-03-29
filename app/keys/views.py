from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter
from django.shortcuts import get_object_or_404
from .serializers import KeySerializer
from rest_framework import viewsets
from .models import Key


class KeyViewSet(viewsets.ModelViewSet):
    """

    Readonly API endpoint for Keys.

    Methods:
    -----------------------
    :list: GET list of Keys.
    :retrieve: GET one Key.
    :create: POST create/insert Key.
    :update: PUT update/replace Key.
    :partial_update: PATCH Key.
    :destry: DELETE Key.

    """

    serializer_class = KeySerializer
    permission_classes = [IsAuthenticated, ]
    queryset = Key.objects.all()
    filter_fields = ['title', 'description', 'username', 'id', 'url']
    filter_backends = [SearchFilter, ]
