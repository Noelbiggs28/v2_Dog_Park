from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import TraitSerializer
from .models import Trait

class TraitView(APIView):

    def get(self, request, pk=None):
        if pk is not None:
            trait = get_object_or_404(Trait, pk=pk)
            serializer = TraitSerializer(trait)
        else:
            traits = Trait.objects.order_by("pk")
            serializer = TraitSerializer(traits, many=True)
        return Response(serializer.data)