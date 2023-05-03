from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view ,permission_classes
from .serializers import NotesSerializer
from .models import Note
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
def Routes(request):
    routes = [
        {
            'Endpoint': 'api/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of all notes'
        },
        {
            'Endpoint': 'api/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': 'api/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': 'api/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': 'api/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NotesSerializer(notes,many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getNote(request,pk):
    note = Note.objects.get(id = pk)
    serializer = NotesSerializer(note,many = False)
    return Response(serializer.data)

@api_view(['PUT'])
@csrf_exempt
def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NotesSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response()

@api_view(['DELETE'])
@csrf_exempt
def deleteNote(request,pk):
    note = Note.objects.get(id = pk)
    note.delete()
    return Response('note was deleted!..')

@api_view(['POST'])
@csrf_exempt
def createNote(request):
    print(request)
    data = request.data
    note = Note.objects.create(
        body = data['body']
    )
    serializer = NotesSerializer(note,many=False)
    return Response(serializer.data)
