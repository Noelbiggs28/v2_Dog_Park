from django.urls import path
from . import views

urlpatterns = [
    path('', views.TraitView.as_view()),
    path('<int:pk>', views.TraitView.as_view())
]