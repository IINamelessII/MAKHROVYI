# Generated by Django 2.2.6 on 2019-10-10 19:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_stats'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]