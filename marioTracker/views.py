from typing import Any
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views import generic

from .models import Players

# Create your views here.
class IndexView(generic.ListView):
    template_name = "marioTracker/index.html"
    context_object_name = "players_list"

    def get_queryset(self):
        return Players.objects.all()


class DetailView(generic.DetailView):
    model = Players
    context_object_name = "player"
    template_name = "marioTracker/details.html"
    

