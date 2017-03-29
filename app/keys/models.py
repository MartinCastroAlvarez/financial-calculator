from django.db import models


class Key(models.Model):
    """

    Kain Key.

    Attributes:
    -----------------------
    :id: Unique Key ID.
    :title: Key title.
    :username: Key username.
    :password: Key password.
    :url: Key URL
    :description: Key additional description.

    """

    title = models.CharField(max_length=255, blank=False, null=False, unique=True, db_index=True)
    username = models.CharField(max_length=100, blank=True, null=True, db_index=True)
    password = models.CharField(max_length=100, blank=True, null=True)
    url = models.URLField(max_length=250, blank=True, null=True, db_index=True)
    description = models.CharField(max_length=2000, blank=True, null=True, db_index=True)

    def __str__(self):
        return self.title

    class Meta:
        abstract = True
        ordering = ['title', ]
