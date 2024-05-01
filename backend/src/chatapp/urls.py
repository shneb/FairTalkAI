from rest_framework.routers import DefaultRouter
from .views import ChatViewSet, MessageViewSet

router = DefaultRouter()
router.register(r'chats', ChatViewSet, basename='chats')
router.register(r'chats/(?P<chat_id>\d+)/messages', MessageViewSet, basename='messages')

urlpatterns = router.urls
