from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid

class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat {self.pk}"

class Bias(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    score = models.CharField(max_length=10)  # Storing percentage as string
    type = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f"{self.type} bias with score {self.score}"

class Message(models.Model):
    class RoleChoices(models.TextChoices):
        USER = 'user', _('User')
        ASSISTANT = 'assistant', _('Assistant')

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.TextField()
    role = models.CharField(max_length=10, choices=RoleChoices.choices)
    timestamp = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    bias = models.ForeignKey(Bias, on_delete=models.SET_NULL, null=True, blank=True, related_name="messages")

    def __str__(self):
        return f"{self.role}: {self.content}"
