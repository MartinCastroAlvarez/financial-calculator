from rest_framework.authtoken import views
from django.conf.urls import url

urlpatterns = [
    url(r'^', views.obtain_auth_token)
]
