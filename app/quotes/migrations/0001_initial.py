# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-29 00:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=2500)),
                ('author', models.CharField(blank=True, max_length=250, null=True)),
            ],
            options={
                'ordering': ['author', 'text'],
            },
        ),
    ]