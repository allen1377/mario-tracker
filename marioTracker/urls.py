from django.urls import path


from marioTracker import views

app_name = "marioTracker"
urlpatterns = [
    path("", views.customIndexView.as_view(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    path("maps", views.MapView.as_view(), name="map"),
    path("genMap", views.DisplayMapView.as_view(), name="displayView"),
]