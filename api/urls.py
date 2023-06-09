from django.urls import path
from . import views
urlpatterns = [
    path('',views.Routes,name='Routes'),
    path('notes/',views.getNotes,name = 'notes'),
    path('note/create/',views.createNote,name='create-note'),
    path('notes/<str:pk>/',views.getNote,name = 'note'),
    path('notes/<str:pk>/update/',views.updateNote,name = 'update-note'),
    path('notes/<str:pk>/delete/',views.deleteNote,name = 'delete-note'),
]
