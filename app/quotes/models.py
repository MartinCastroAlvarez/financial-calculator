from django.db import models
import random


class Quote(models.Model):
    """

    Random Quote.

    Attributes:
    -----------------------
    :id: Unique Quote ID.
    :text: Text.
    :author: Author, if known.

    Static Methods:
    -----------------------
    :random: Get a random quote.

    """

    text = models.CharField(max_length=2500, blank=False, null=False)
    author = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        if self.author:
            return "{} - {}".format(self.author, self.text)
        else:
            return self.text

    class Meta:
        ordering = ['author', "text"]

    @classmethod
    def random(cls):
        random_idx = random.randint(0, Quote.objects.count() - 1)
        return Quote.objects.all()[random_idx]
