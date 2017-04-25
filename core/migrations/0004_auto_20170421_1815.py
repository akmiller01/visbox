# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2017-04-21 18:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_visualisation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visualisation',
            name='y_maximum_value',
            field=models.DecimalField(blank=True, decimal_places=5, max_digits=99, null=True),
        ),
    ]