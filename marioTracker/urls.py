from django.urls import path
from django.views import generic

from . import views

app_name = "marioTracker"
urlpatterns = [
    path("", views.customIndexView(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="detail")
]