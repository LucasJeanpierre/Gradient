from django.http import HttpResponse
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

    permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer
    
    """
    if action is retrieve, return the note with the given id
    if action is list, return notes for a given category (get parameter category)
    """
    def get_queryset(self):
        if self.action == 'retrieve':
            return Note.objects.filter(id=self.kwargs['pk'])
        else:
            category = self.request.GET.get('category')
            return Note.objects.filter(category=category)

    def destroy(self, request, pk=None):
        note = Note.objects.get(pk=pk)
        note.delete()
        return HttpResponse(status=204)

    def partial_update(self, request, pk=None):
        note = Note.objects.get(pk=pk)
        try:
            for key in request.data:
                if key == 'title':
                    note.title = request.data[key]
                elif key == 'description':
                    note.description = request.data[key]
        except:
            pass
        note.modified_at = datetime.datetime.now()
        note.save()
        return HttpResponse(status=202)
        

"""
TaskViewSet
return a list of tasks for a given category
"""
class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
    
    """
    if action is retrieve, return the task with the given id
    if action is list, return tasks for a given category (get parameter category)
    """
    def get_queryset(self):
        if self.action == 'retrieve':
            return Task.objects.filter(id=self.kwargs['pk'])
        if (self.action == 'list'):
            category = self.request.GET.get('category')
            if (category):
                return Task.objects.filter(category=category)
            else:
                return[]

    def destroy(self, request, pk=None):
        task = Task.objects.get(pk=pk)
        task.delete()
        return HttpResponse(status=202)

    def partial_update(self, request, pk=None):
        task = Task.objects.get(pk=pk)
        try:
            for key in request.data:
                if key == 'title':
                    task.title = request.data['title']
                if key == 'description':
                    task.description = request.data['description']
                if key == 'done':
                    task.done = request.data['done']
        except:
            pass
        task.modified_at = datetime.datetime.now()
        task.save()
        return HttpResponse(status=202)
        