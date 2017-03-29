from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'', views.QuoteViewSet, base_name="quotes")

urlpatterns = [
    url(r'random', views.RandomView.as_view(), name='random'),
    url(r'', include(router.urls)),
]
