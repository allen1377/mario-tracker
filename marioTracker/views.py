import random
from typing import Any, Dict
from django.db.models.query import QuerySet
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views import generic

from .utils.form import WinsFilterForm
from .models import Players, Map, Wins

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

        return context

class DetailView(generic.DetailView):
    model = Players
    context_object_name = "player"
    template_name = "marioTracker/details.html"
    
class DisplayMapView(generic.ListView):
    template_name = "marioTracker/mapDisplay.html"
    context_object_name = "map_list"

    def get_queryset(self) -> QuerySet[Any]:
        numberList = self.randomNum()
        return Map.objects.filter(pk__in = numberList)
    
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)

        mapChoices = self.getMapChoices(context)
        mapTexts = self.getMapTexts(context)

        context['mapChoices'] = mapChoices
        context['mapTexts'] = mapTexts

        return context
    
    def randomNum(self):
        randomNumbers = list()
        numbers = list(range(1,32))
        randomNumbers = random.sample(numbers, k=10)

        return randomNumbers
    
    def getMapChoices(self, context):
        maps = context.get("object_list")
        mapsURL = list()
        print("Keys: ", context.keys())
        print("\nMaps: ", maps)
        for map in maps:
            mapsURL.append(map.imageURL)

        return mapsURL
    
    def getMapTexts(self, context):
        maps = context.get("object_list")
        mapsText = list()
        for map in maps:
            mapsText.append(map.mapName)

        return mapsText
    
class StatsOrMapView(generic.ListView):
    template_name = "marioTracker/statsOrMap.html"
    context_object_name = "players_list"

    def get_queryset(self):
        return Map.objects.all()
    
def get_filtered_wins(request):
    form = WinsFilterForm(request.GET)
    wins = Wins.objects.all()
    print(wins)

    if form.is_valid():
        start_time = form.cleaned_data.get('start_time')
        end_time = form.cleaned_data.get('end_time')
        player = form.cleaned_data.get('player')

        if start_time and end_time:
            wins = wins.filter(date__range=(start_time, end_time))
            print(start_time, end_time)
            print(wins)

        if player:
            wins = wins.filter(winner__firstname=player)
            print(player)
            print(wins)
        print('fail')

    return render(request, 'marioTracker/statsOrMap.html', {'form': form, 'wins': wins})

    