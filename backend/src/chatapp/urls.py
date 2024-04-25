from django.urls import path
from .views import ChatListCreateAPIView, MessageListCreateAPIView

urlpatterns = [
    path('/', ChatListCreateAPIView.as_view(), name='chat-list-create'),
    path('/<uuid:chat_id>/messages/', MessageListCreateAPIView.as_view(), name='message-list-create'),
]
