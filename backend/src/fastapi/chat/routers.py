from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from typing import List, Optional
from .models import Chat, Message, Bias
from .utils import get_openai_response
from ..users.models import User
from ..core.database import get_db
from .schema import ChatListRead, MessageCreate, MessageRead
from ..core.security import get_current_user, oauth2_schema
from ..core.database import sessionLocal, engine

chat_router = APIRouter(prefix="/chats", tags=["Chats"], dependencies=[Depends(oauth2_schema)])

session=sessionLocal(bind=engine)


@chat_router.get("/", response_model=List[ChatListRead])
async def list_chats(db: Session = Depends(get_db), user: User = Depends(get_current_user),):
    """Retrieves all chats sorted by last updated time."""
    chats = db.query(Chat).filter(Chat.user_id == user.id).order_by(Chat.updated_at.desc()).all()
    return chats

@chat_router.delete("/{chat_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_chat(chat_id: int, db: Session = Depends(get_db)):
    """Deletes a chat by ID, handling not found errors."""
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not chat:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chat not found")
    db.delete(chat)
    db.commit()
    return {"message": "Chat deleted successfully"}

@chat_router.get("/{chat_id}/messages", response_model=List[MessageRead])
async def list_messages(chat_id: int, db: Session = Depends(get_db)):
    """Fetches all messages for a specific chat."""
    return db.query(Message).filter(Message.chat_id == chat_id).all()

@chat_router.post("/messages", response_model=List[MessageRead])
async def post_message(message_data: MessageCreate, chat_id: Optional[int] = None, db: Session = Depends(get_db)):
    """Creates a message in an existing chat or starts a new chat if chat_id is not provided."""
    if chat_id is None:
        # Create a new chat if no chat_id is provided
        new_chat = Chat()  # Set default title here
        db.add(new_chat)
        db.commit()
        db.refresh(new_chat)
        chat_id = new_chat.id
    
    # Now proceed with the creation of the message
    message = Message(**message_data.dict(), chat_id=chat_id)
    db.add(message)
    db.commit()

    # Append user's message and get AI response
    message_list = [{"role": msg.role, "content": msg.content} for msg in db.query(Message).filter(Message.chat_id == chat_id).all()]
    message_list.append({"role": "user", "content": message.content})
    ai_message, bias_data = get_openai_response(message_list)

    if ai_message and bias_data:
        bias = Bias(**bias_data)
        db.add(bias)
        db.commit()

        ai_response = Message(content=ai_message, role='assistant', chat_id=chat_id, bias_id=bias.id)
        db.add(ai_response)
        db.commit()
        return [message, ai_response]
    else:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Failed to get response from OpenAI")

