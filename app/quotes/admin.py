from django.contrib import admin
from .models import Quote


class QuoteAdmin(admin.ModelAdmin):

    search_fields = ['text', 'author', 'id']

admin.site.register(Quote, QuoteAdmin)
