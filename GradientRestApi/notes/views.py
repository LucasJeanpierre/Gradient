from django.http import HttpResponse
from django.shortcuts import render
from requests import delete, get, post
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Category, Note, Task
from .serializer import CategorySerializer, NoteSerializer, TaskSerializer
import datetime

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

    def destroy(self, request, pk=None):
        note = Note.objects.get(pk=pk)
        note.delete()
        return HttpResponse(status=204)

    def update(self, request, pk=None):
        note = Note.objects.get(pk=pk)
        note.title = request.data['title']
        note.description = request.data['description']
        note.modified_at = datetime.datetime.now()
        note.save()
        return HttpResponse(status=202)
        
    permission_classes = [IsAuthenticated]
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
                print('no retrieve')
                category = self.request.GET.get('category')
                if (category):
                    return Task.objects.filter(category=category)
                else:
                    return[]

        def destroy(self, request, pk=None):
            task = Task.objects.get(pk=pk)
            task.delete()
            return HttpResponse(status=202)

        def update(self, request, pk=None):
            task = Task.objects.get(pk=pk)
            print(request.data)
            task.title = request.data['title']
            task.description = request.data['description']
            task.done = request.data['done']
            task.modified_at = datetime.datetime.now()
            task.save()
            return HttpResponse(status=202)
            

        permission_classes = [IsAuthenticated]
        serializer_class = TaskSerializer