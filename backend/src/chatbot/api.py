import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiParameter
from openai import OpenAI
from .utils import estimate_bias
from .models import Chat, Message, Bias
from .serializers import (
    ChatMessageSerializer,
    ChatResponseSerializer,
    MessageSerializer,
    ChatSerializer,
    BiasSerializer,
)

import os

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

class ChatList(APIView):
    @extend_schema(
        summary="Retrieve all chat sessions",
        description="Fetches a list of all chat sessions, ordered by the most recently created.",
        responses={
            200: extend_schema(
                description="A successful response with a list of all chat sessions.",
                examples=[
                    OpenApiExample(
                        name="Example response",
                        summary="Example response showing a list of chat sessions",
                        value=[
                            {
                                "id": "123e4567-e89b-12d3-a456-426614174000",
                                "created_at": "2024-01-01T00:00:00Z",
                            },
                            {
                                "id": "123e4567-e89b-12d3-a456-426614174001",
                                "created_at": "2024-01-02T00:00:00Z",
                            }
                        ],
                        response_only=True,
                    )
                ]
            ),
        }
    )
    def get(self, request):
        chats = Chat.objects.all().order_by('-created_at')
        return Response(ChatSerializer(chats, many=True).data)

class ChatCreate(APIView):
    @extend_schema(
        summary="Create a new chat session",
        description="Creates a new chat session and returns the details of the newly created session.",
        responses={
            201: extend_schema(
                description="A successful response with details of the newly created chat session.",
                examples=[
                    OpenApiExample(
                        name="Example created chat session",
                        summary="Example response for a created chat session",
                        value={
                            "id": "123e4567-e89b-12d3-a456-426614174000",
                            "created_at": "2024-01-01T00:00:00Z",
                        },
                        response_only=True,
                    )
                ]
            ),
        }
    )
    def post(self, request):
        chat = Chat.objects.create()
        return Response(ChatSerializer(chat).data, status=status.HTTP_201_CREATED)

class ChatMessages(APIView):
    @extend_schema(
        summary="Retrieve messages by chat ID",
        description="Fetches all messages for a specific chat session based on its UUID.",
        parameters=[
            OpenApiParameter(name="chat_id", description="The UUID of the chat session to retrieve messages from.", required=True, type=str, location='path')
        ],
        responses={
            200: extend_schema(
                description="A list of messages for the specified chat session.",
                examples=[
                    OpenApiExample(
                        name="Example message list",
                        summary="Example response showing messages for a specific chat",
                        value=[
                            {
                                "id": "abc12345-dead-beef-1234-abcdef123456",
                                "content": "Hello, how can I help you?",
                                "role": "assistant",
                                "timestamp": "2024-01-01T00:00:00Z",
                                "chat": "123e4567-e89b-12d3-a456-426614174000",
                                "bias": None
                            },
                            {
                                "id": "abc12345-dead-beef-5678-abcdef123456",
                                "content": "I need assistance with my account.",
                                "role": "user",
                                "timestamp": "2024-01-01T00:01:00Z",
                                "chat": "123e4567-e89b-12d3-a456-426614174000",
                                "bias": None
                            }
                        ],
                        response_only=True,
                    )
                ]
            ),
        }
    )
    def get(self, request, chat_id):
        chat = Chat.objects.get(id=chat_id)
        messages = Message.objects.filter(chat=chat).order_by('timestamp')
        return Response(MessageSerializer(messages, many=True).data)


class Chatbot(APIView):
    @extend_schema(
        tags=['Chatbot'],
        summary="Post a chat message",
        description="Send a message to the chatbot and receive a response, including bias analysis if applicable.",
        request=ChatMessageSerializer,
        responses={
            200: extend_schema(
                description="A successful response containing the AI-generated message and any detected biases.",
                examples=[
                    OpenApiExample(
                        name="Successful Response Example",
                        summary="Example of a successful chat message response",
                        value={
                            "message": "Hello, how can I help you today?",
                            "chat_id": "123e4567-e89b-12d3-a456-426614174000",
                            "bias": {
                                "type": "none",
                                "level": "low"
                            }
                        }
                    )
                ]
            ),
            400: extend_schema(
                description="Validation errors or other bad requests",
                examples=[
                    OpenApiExample(
                        name="Error Response Example",
                        summary="Example of an error response due to invalid input",
                        value={
                            "message": ["This field may not be blank."]
                        }
                    )
                ]
            )
        }
    )
    def post(self, request, format=None):
        serializer = ChatMessageSerializer(data=request.data)
        if serializer.is_valid():
            request_message = serializer.validated_data.get('message')
            chat_id = serializer.validated_data.get('chat_id')
            chat = Chat.objects.get(id=chat_id) if chat_id else Chat.objects.create()

            Message.objects.create(content=request_message, role=Message.RoleChoices.USER, chat=chat)

            messages = Message.objects.filter(chat=chat).order_by('timestamp')
            message_list = [{'role': msg.role, 'content': msg.content} for msg in messages]
            message_list.append({'role': 'user', 'content': request_message})

            response = client.chat.completions.create(messages=message_list, model="gpt-3.5-turbo")
            ai_message = response.choices[0].message.content

            bias_data = estimate_bias(ai_message)
            bias_instance = Bias.objects.create(**bias_data) if bias_data else None

            Message.objects.create(
                content=ai_message, 
                role=Message.RoleChoices.ASSISTANT, 
                chat=chat, 
                bias=bias_instance
            )

            return Response({
                "message": ai_message,
                "chat_id": chat.id,
                "bias": BiasSerializer(bias_instance).data if bias_instance else None
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
