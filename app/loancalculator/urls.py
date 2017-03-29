from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^quotes/', include('quotes.urls', namespace='quotes')),
    url(r'^login/', include('login.urls', namespace='login')),
    url(r'^keys/', include('keys.urls', namespace='keys')),
]
