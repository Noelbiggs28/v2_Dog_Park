from django.urls import path
from . import views

urlpatterns = [
    path('', views.WeatherView.as_view()),
    path('<int:pk>', views.WeatherView.as_view())
]