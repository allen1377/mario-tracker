from typing import Any, Dict
from django.db.models.query import QuerySet
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

class customIndexView(generic.ListView):
    template_name = "marioTracker/index.html"
    context_object_name = "index_list"

    def get_queryset(self) -> QuerySet[Any]:
        return Players.objects.all()
    
    def get_context_data(self, **kwargs: Any):
        context = super().get_context_data(**kwargs)
        nav_links_list = ["Home", "Map Generator", "Players"]
        nav_urls_list = ["marioTracker:index", "marioTracker:maps", "marioTracker:detail"]
        zipped_List = zip(nav_links_list, nav_urls_list)
        context["zipped_List"] = zipped_List

        print(context)
        return context

class DetailView(generic.DetailView):
    model = Players
    context_object_name = "player"
    template_name = "marioTracker/details.html"
    

