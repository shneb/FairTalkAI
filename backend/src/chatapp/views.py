from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Chat, Message, Bias
from .serializers import ChatSerializer, MessageSerializer
from .utils import get_openai_response, estimate_bias
from drf_spectacular.utils import extend_schema


class ChatListCreateAPIView(APIView):
    def get(self, request):
        chats = Chat.objects.all()
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MessageListCreateAPIView(APIView):
    
    def get(self, request, chat_id):
        messages = Message.objects.filter(chat_id=chat_id)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    @extend_schema(
        request=MessageSerializer,
        responses={
            201: MessageSerializer,
            502: {'description': 'Failed to get response from OpenAI'}
        }
    )
    def post(self, request, chat_id):
        request.data['chat'] = chat_id  # Ensure the message is linked to the chat
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            message_list = [{"role": msg.role, "content": msg.content} for msg in Message.objects.filter(chat_id=chat_id)]
            message_list.append({"role": "user", "content": serializer.validated_data['content']})

            ai_message = get_openai_response(message_list)
            if ai_message:
                serializer.save()  # Save the user's message
                bias_data = estimate_bias(ai_message)
                bias = Bias.objects.create(**bias_data)

                # Save the AI's response
                Message.objects.create(
                    content=ai_message,
                    role='assistant',
                    chat_id=chat_id,
                    bias=bias
                )

                return Response({"message": ai_message, "bias": bias_data}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Failed to get response from OpenAI"}, status=status.HTTP_502_BAD_GATEWAY)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
