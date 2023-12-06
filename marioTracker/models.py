from typing import Any
from django.db import models

# Create your models here.
class Players(models.Model):
    id= models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    races = models.IntegerField(default=0)
    favCharacter = models.CharField(max_length=200, null=True, blank=True)   

    def __str__(self):
        return self.firstname

class Wins(models.Model):
    date = models.DateTimeField("Time won", auto_now_add=True)
    winner = models.ForeignKey(Players, null = False, on_delete=models.CASCADE)

    def __str__(self):
        return f'Player: {self.winner.firstname} {self.winner.lastname} won! ({self.date})'
    
class Map(models.Model):
    id=models.AutoField(primary_key=True)
    imageURL = models.CharField(max_length=50)
    mapName = models.CharField(max_length=50)
