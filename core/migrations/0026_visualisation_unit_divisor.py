# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-06-14 12:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0025_auto_20170614_1222'),
    ]

    operations = [
        migrations.AddField(
            model_name='visualisation',
            name='unit_divisor',
            field=models.IntegerField(default=1),
        ),
    ]
