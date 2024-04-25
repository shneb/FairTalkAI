from rest_framework import serializers
from .models import Chat, Message, Bias

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'created_at', 'updated_at')
        extra_kwargs = {
            'id': {'read_only': True},
            'created_at': {'read_only': True, 'help_text': 'Timestamp when the chat was created.'},
            'updated_at': {'read_only': True, 'help_text': 'Timestamp when the chat was last updated.'}
        }

class BiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bias
        fields = '__all__'
        extra_kwargs = {
            'type': {'help_text': 'Type of bias detected in the message.'},
            'level': {'help_text': 'Severity level of the detected bias.'}
        }

class MessageSerializer(serializers.ModelSerializer):
    bias = BiasSerializer(read_only=True, help_text="Details about any detected bias associated with this message.")

    class Meta:
        model = Message
        fields = '__all__'
        extra_kwargs = {
            'content': {'help_text': 'Content of the message.'},
            'timestamp': {'read_only': True, 'help_text': 'When the message was sent.'},
            'role': {'help_text': 'Role of the message sender (e.g., USER or ASSISTANT).'}
        }

class ChatMessageSerializer(serializers.Serializer):
    chat_id = serializers.UUIDField(required=False, help_text="UUID of the chat session; leave empty for a new session.")
    message = serializers.CharField(required=True, help_text="Text message to be sent to the chatbot.")

    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Message cannot be empty.")
        return value

class ChatResponseSerializer(serializers.Serializer):
    message = serializers.CharField(help_text="Chatbot's response message.")
    bias = BiasSerializer(read_only=True, help_text="Analysis of the response for any bias, if detected.")

    class Meta:
        fields = ['message', 'bias']
