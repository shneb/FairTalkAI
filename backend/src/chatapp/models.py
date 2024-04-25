from django.db import models
import uuid

class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Message(models.Model):
    class RoleChoices(models.TextChoices):
        USER = 'user', 'User'
        ASSISTANT = 'assistant', 'Assistant'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.TextField()
    role = models.CharField(max_length=10, choices=RoleChoices.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
    bias = models.ForeignKey('Bias', related_name='messages', on_delete=models.SET_NULL, null=True, blank=True)

class Bias(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    score = models.CharField(max_length=10)  # Storing percentage as string
    type = models.CharField(max_length=100)
    description = models.TextField()
