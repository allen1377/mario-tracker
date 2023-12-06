import random
from typing import Any, Dict
from django.db.models.query import QuerySet
from django.shortcuts import render, redirect, get_list_or_404, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views import generic, View
from django.utils import timezone
from pytz import timezone as pytz_timezone

from .utils.form import WinsFilterForm, PlayerCreationForm, PlayerSelectForm
from .models import Players, Map, Wins

# Create your views here.
class MapView(View):
    template_name = "marioTracker/map.html"

    def post(self, request, *args, **kwargs):
        selectedPlayers = request.POST.getlist('selectedPlayers')

        url = reverse('marioTracker:displayView') + f'?selectedPlayers={",".join(selectedPlayers)}'
        return redirect(url)

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
    
class DisplayMapView(View):
    template_name = "marioTracker/mapDisplay.html"

    def get(self, request, *args, **kwargs):
        numberList = self.randomNum()
        maps = Map.objects.filter(pk__in=numberList)

        mapChoices = [map.imageURL for map in maps]
        mapTexts = [map.mapName for map in maps]

        getIDs = request.GET.get('selectedPlayers', '')
        idList = getIDs.split(',') if getIDs else []
        selectedPlayers = get_list_or_404(Players, id__in=idList)

        context = {
            'mapChoices': mapChoices,
            'mapTexts': mapTexts,
            'selectedPlayers': selectedPlayers,
        }

        return render(request, self.template_name, context)
    
    def post(self, request, *args, **kwargs):
        winnerID = request.POST.get('winner')

        if winnerID:
            player = get_object_or_404(Players, pk=winnerID)
            player.races = player.races + 1
            player.save()
            Wins.objects.create(winner=player, date=timezone.now())

        url = reverse('marioTracker:congratsView', kwargs={'winner': player.id})
        return redirect(url)
    
    def randomNum(self):
        randomNumbers = list(range(1, 32))
        random.shuffle(randomNumbers)
        return randomNumbers[:10]
    
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
                
                url = reverse('marioTracker:displayView') + f'?player_ids={",".join(str(player.id) for player in selectedPlayers)}'
                return redirect(url)

        if 'player_creation_submit' in request.POST:
            player_creation_form = PlayerCreationForm(request.POST)
            if player_creation_form.is_valid():
                
                new_player = player_creation_form.save(commit=False)

                new_player.save()

                return render(request, 'marioTracker/statsOrMap.html', {
                    'player_select_form': PlayerSelectForm(),
                    'player_creation_form': PlayerCreationForm(),
                    'win_record_form': WinsFilterForm(),
                    'players': Players.objects.all(),
                    'success_message': 'Player has been created successfully.'
                })

        if 'win_record_submit' in request.POST:
            win_record_form = WinsFilterForm(request.POST)
            if win_record_form.is_valid():
                # Process win record form
                # Save the win record to the database or perform required actions
                wins = Wins.objects.all()
                startTime = win_record_form.cleaned_data.get('start_time')
                endTime = win_record_form.cleaned_data.get('end_time')
                player = win_record_form.cleaned_data.get('player')

                if startTime and endTime:
                    wins = wins.filter(date__range=(startTime, endTime))
                if player:
                    wins = wins.filter(winner__firstname=player)
                
                return render(request, 'marioTracker/statsOrMap.html', {
                    'player_creation_form': player_creation_form,
                    'win_record_form': win_record_form,
                    'wins': wins,
                    'players': Players.objects.all(),
                })
    print(Players.objects.all())
    return render(request, 'marioTracker/statsOrMap.html', {
        'player_creation_form': player_creation_form,
        'win_record_form': win_record_form,
        'players': Players.objects.all(),
    })

def successView(request, winner):
    player = get_object_or_404(Players, id=int(winner))
    return render(
        request,
        'marioTracker/congratulations.html', 
        {
            'winner': player, 
            'wins': get_list_or_404(Wins, winner=player)
        }
    )