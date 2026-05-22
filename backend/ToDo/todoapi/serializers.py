from rest_framework import serializers
from .models import Tasks
class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tasks
        fields=["id","task","is_completed","date"]