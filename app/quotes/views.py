from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, views, status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .serializers import QuoteSerializer
from .models import Quote


class QuoteViewSet(viewsets.ModelViewSet):
    """

    Readonly API endpoint for Quotes.

    Methods:
    -----------------------
    :list: GET list of Quotes.
    :retrieve: GET one Quote.
    :create: POST create/insert Quote.
    :update: PUT update/replace Quote.
    :partial_update: PATCH Quote.
    :destry: DELETE Quote.

    """

    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticated, ]
    queryset = Quote.objects.all()


class RandomView(views.APIView):
    """

    Returns a random Quote.

    Methods:
    -----------------------
    :get: Get Quote.

    """

    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        q = Quote.random()
        serializer = self.serializer_class(q)
        return Response(serializer.data, status=status.HTTP_200_OK)
