from rest_framework import mixins, viewsets, status
from rest_framework.response import Response

from .models import Chat, Message, Bias
from .serializers import ChatSerializer, MessageSerializer
from .utils import get_openai_response, estimate_bias

class MessageViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def list(self, request, *args, **kwargs):
        chat_id = self.kwargs['chat_id']
        messages = self.queryset.filter(chat_id=chat_id)
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        request.data['chat'] = self.kwargs['chat_id']
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            message_list = [{"role": msg.role, "content": msg.content} for msg in Message.objects.filter(chat_id=self.kwargs['chat_id'])]
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
                    chat_id=self.kwargs['chat_id'],
                    bias=bias
                )

                return Response({"message": ai_message, "bias": bias_data}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Failed to get response from OpenAI"}, status=status.HTTP_502_BAD_GATEWAY)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
