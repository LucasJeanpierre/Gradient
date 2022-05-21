from django.contrib import admin
from .models import Category, Note, Task


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'color', 'description')
    search_fields = ('name', 'color')

class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'category', 'created_at', 'updated_at')
    search_fields = ('title', 'category', 'description')

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'category', 'done', 'created_at', 'updated_at')
    search_fields = ('title', 'category', 'done', 'description')

# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(Task, TaskAdmin)