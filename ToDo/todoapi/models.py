from django.db import models

# Create your models here.

class Tasks(models.Model):
    task=models.CharField(max_length=50)
    is_completed=models.BooleanField(default=False)
    date=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.task