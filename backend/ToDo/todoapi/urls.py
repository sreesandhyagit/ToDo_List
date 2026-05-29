from django.urls import path
from todoapi import views

urlpatterns = [
    path("",views.AddViewTask),
    path("edit-task/<int:task_id>",views.editTask)
]
