import random
from typing import Any, Dict
from django.db.models.query import QuerySet
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views import generic

from .models import Players

# Create your views here.
class MapView(generic.ListView):
    template_name = "marioTracker/map.html"
    context_object_name = "players_list"

    def get_queryset(self):
        return Players.objects.all()

class customIndexView(generic.ListView):
    template_name = "marioTracker/index.html"
    context_object_name = "index_list"

    def get_queryset(self) -> QuerySet[Any]:
        return Players.objects.all()
    
    def get_context_data(self, **kwargs: Any):
        context = super().get_context_data(**kwargs)
        nav_links_list = ["Home", "Map Generator"]
        nav_urls_list = ["marioTracker:index", "marioTracker:map"]
        zipped_List = zip(nav_links_list, nav_urls_list)
        context["zipped_List"] = zipped_List

        print(context)
        return context

class DetailView(generic.DetailView):
    model = Players
    context_object_name = "player"
    template_name = "marioTracker/details.html"
    
class DisplayMapView(generic.ListView):
    template_name = "marioTracker/mapDisplay.html"
    context_object_name = "map_list"

    def get_queryset(self) -> QuerySet[Any]:
        return self.randomMap()
    
    def randomMap(self):
        mapList = [
             "LuigiCircuit", "MushroomGorge", "MooMooMeadows",
            "ToadsFactory", "MarioCircuit", "CoconutMall",
            "DKSummit", "Wario'sGoldmine", "DaisyCircuit",
            "GrumbleVolcano", "KoopaCape", "MapleTreeway",
            "BowsersCastle", "DryDryRuins", "MoonViewHighway",
            "RainbowRoad", "PeachBeach", "YoshiFalls",
            "GhostValley2", "MarioRaceway", "SherbertLand",
            "ShyGuyBeach", "DelfinoSquare", "WaluigiStadium",
            "DesertHills", "BowsersCastle3", "DK'sJungleParkway",
            "MarioCircuit", "MarioCircuit3", "PeachGardens",
            "DK-Mountain", "Bowser's Castle" ]
        
        mapChoices = random.choices(mapList, k=9)
        return mapChoices
            
