import random
from typing import Any, Dict
from django.db.models.query import QuerySet
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views import generic

from .utils.form import WinsFilterForm, PlayerCreationForm, PlayerSelectForm 
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
    player_select_form = PlayerSelectForm()
    player_creation_form = PlayerCreationForm()
    win_record_form = WinsFilterForm()

    if request.method == 'POST':
        if 'player_select_submit' in request.POST:
            player_select_form = PlayerSelectForm(request.POST)
            if player_select_form.is_valid():
                # Process player selection form
                selectedPlayers = player_select_form.cleaned_data['players']

                return redirect('DisplayMapView', player_ids=','.join(str(player.id) for player in selectedPlayers))



        if 'player_creation_submit' in request.POST:
            player_creation_form = PlayerCreationForm(request.POST)
            if player_creation_form.is_valid():
                
                new_player = player_creation_form.save(commit=False)

                new_player.save()

                return render(request, 'marioTracker/statsOrMap.html', {
                    'player_select_form': PlayerSelectForm(),
                    'player_creation_form': PlayerCreationForm(),
                    'win_record_form': WinsFilterForm(),
                    'success_message': 'Player has been created successfully.'
                })

        if 'win_record_submit' in request.POST:
            win_record_form = WinsFilterForm(request.POST)
            if win_record_form.is_valid():
                # Process win record form
                # Save the win record to the database or perform required actions
                wins = Wins.objects.all()
                startTime = win_record_form.get('start_time')
                endTime = win_record_form.get('end_time')
                player = win_record_form.cleaned_data.get('player')

                if startTime and endTime:
                    wins = wins.filter(date__range=(startTime, endTime))
                if player:
                    wins = wins.filter(player__firstname=player)
                
                return render(request, 'marioTracker/statsOrMap.html', {
                    'player_select_form': player_select_form,
                    'player_creation_form': player_creation_form,
                    'win_record_form': win_record_form,
                    'wins': wins,
                })


    return render(request, 'marioTracker/statsOrMap.html', {
        'player_select_form': player_select_form,
        'player_creation_form': player_creation_form,
        'win_record_form': win_record_form,
    })
