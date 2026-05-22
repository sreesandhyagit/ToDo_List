from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Tasks
from .serializers import ToDoSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

@api_view(['GET','POST'])
def AddViewTask(request):
    if request.method=='GET':
        tasks=Tasks.objects.all()
        serializer=ToDoSerializer(tasks,many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer=ToDoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','PATCH','DELETE'])
def editTask(request,task_id):
    try:
        task=Tasks.objects.get(id=task_id)
    except Exception:
        return Response(status=status.HTTP_404_NOT_FOUND)    
    if request.method=='GET':
        serializer=ToDoSerializer(task)
        return Response(serializer.data)
    elif request.method=='PUT':
        serializer=ToDoSerializer(task,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='PATCH':
        serializer=ToDoSerializer(task,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='DELETE':
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    
