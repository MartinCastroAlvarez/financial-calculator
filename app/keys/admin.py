from django.contrib import admin
from .models import Key


class KeyAdmin(admin.ModelAdmin):

    search_fields = ['title', 'url', 'id', "username", "description"]

admin.site.register(Key, KeyAdmin)
