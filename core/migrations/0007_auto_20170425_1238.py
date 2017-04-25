# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2017-04-25 12:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20170424_1833'),
    ]

    operations = [
        migrations.AddField(
            model_name='visualisation',
            name='group_by',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='visualisation',
            name='label_font_size',
            field=models.IntegerField(default=10),
        ),
        migrations.AddField(
            model_name='visualisation',
            name='labels_on_chart',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='visualisation',
            name='save_as_template',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='visualisation',
            name='title',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]