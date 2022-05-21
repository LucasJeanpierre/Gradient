from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Category, Note, Task
from .serializer import CategorySerializer, NoteSerializer, TaskSerializer

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

"""
NoteViewSet
return a list of notes for a given category
"""
class NoteViewSet(viewsets.ModelViewSet):
    
    def get_queryset(self):
        if self.action == 'retrieve':
            return Note.objects.all()
        else:
            category = self.request.GET.get('category')
            return Note.objects.filter(category=category)
        
    #permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer

"""
TaskViewSet
return a list of tasks for a given category
"""
class TaskViewSet(viewsets.ModelViewSet):
        
        def get_queryset(self):
            if self.action == 'retrieve':
                return Task.objects.all()
            else:
                category = self.request.GET.get('category')
                return Task.objects.filter(category=category)

        permission_classes = [IsAuthenticated]
        serializer_class = TaskSerializer