from django.urls import path


from marioTracker import views

app_name = "marioTracker"
urlpatterns = [
    path("", views.customIndexView.as_view(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    path("maps", views.MapView.as_view(), name="map"),
    path("genMap", views.DisplayMapView.as_view(), name="displayView"),
    path("statsOrMap", views.StatsOrMapView.as_view(), name="statsOrMap"),
    path('timeframe/', views.get_filtered_wins, name='timeframe_view'),
    path('congrats/<str:winner>/', views.successView, name='congratsView'),
    path('test', views.testView.as_view(), name="test")
]