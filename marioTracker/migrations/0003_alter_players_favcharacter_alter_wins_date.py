# Generated by Django 4.2.4 on 2023-11-13 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marioTracker', '0002_map'),
    ]

    operations = [
        migrations.AlterField(
            model_name='players',
            name='favCharacter',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='wins',
            name='date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Time won'),
        ),
    ]
