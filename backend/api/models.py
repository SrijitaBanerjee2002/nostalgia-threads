from django.db import models
from django.contrib.auth.models import User

class Memory(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='memories')
    region = models.CharField(max_length=255)
    memory = models.TextField()
    tags = models.JSONField(default=list)
    reactions = models.JSONField(default=dict) 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.memory[:50]
