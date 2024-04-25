from rest_framework import serializers
from .models import Chat, Message, Bias

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

class BiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bias
        fields = ('id', 'score', 'type', 'description')
        read_only_fields = ('id',)

class MessageSerializer(serializers.ModelSerializer):
    bias = BiasSerializer(read_only=True)  # Embed the Bias serializer

    class Meta:
        model = Message
        fields = ('id', 'content', 'role', 'created_at', 'updated_at', 'chat', 'bias')
        read_only_fields = ('id', 'created_at', 'updated_at')
