from typing import Any
from django.db import models

# Create your models here.
class Players(models.Model):
    firstname = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    races = models.IntegerField(default=0)
    favCharacter = models.CharField(max_length=200, null=True)   

    def __str__(self):
        return self.firstname

class Wins(models.Model):
    date = models.DateTimeField("Time won")
    winner = models.ForeignKey(Players, null = False, on_delete=models.CASCADE)

    def __str__(self):
        return f'Player: {self.winner.firstname} {self.winner.lastname} won! ({self.date})'
    
class Map(models.Model):
    imageURL = models.CharField(max_length=50)
    mapName = models.CharField(max_length=50)
