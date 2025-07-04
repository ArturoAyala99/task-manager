from django.shortcuts import render
from rest_framework.views import APIView
from .models import Tarea
from .serializers import TareaSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404

# Create your views here.
class Tareas(APIView):
    #get Tareas
    def get(self, request):
        productos = Tarea.objects.all()
        serializer = TareaSerializer(productos, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    #create Productos
    def post(self, request):
        serializer = TareaSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        #de lo contrario, devolvemos un error
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TareaTareaDetail(APIView):
    def get_object(self, pk):
        try:
            return Tarea.objects.get(pk=pk)
        except Tarea.DoesNotExist:
            raise Http404
        
    #get
    def get(self, request, pk):
        producto = self.get_object(pk)
        serializer = TareaSerializer(producto)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        producto = self.get_object(pk)
        serializer = TareaSerializer(producto,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        producto = self.get_object(pk)
        producto.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)