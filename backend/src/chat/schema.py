from __future__ import annotations
from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional

# Schemas for Chat
class ChatBase(BaseModel):
    title: Optional[str] = Field(None, description="The title of the chat session.")

class ChatCreate(ChatBase):
    pass

class ChatListRead(BaseModel):
    id: int
    title: str
    updated_at: datetime

    class Config:
        orm_mode = True

# Schemas for Message
class MessageBase(BaseModel):
    content: str = Field(..., description="The text content of the message.")
    role: str = Field(..., description="The role of the message sender, e.g., 'user' or 'assistant'.")

class MessageCreate(MessageBase):
    pass

class MessageRead(MessageBase):
    id: int
    created_at: datetime
    updated_at: datetime
    chat_id: int
    bias: Optional[BiasRead] = None

    class Config:
        orm_mode = True

# Schemas for Bias
class BiasBase(BaseModel):
    score: str = Field(..., description="A numerical score representing the detected bias.")
    type: str = Field(..., description="The type of bias detected, e.g., gender, age, racial.")
    description: str = Field(..., description="A brief description of the bias.")

class BiasCreate(BiasBase):
    pass

class BiasRead(BiasBase):
    id: int

    class Config:
        orm_mode = True

# Call update_forward_refs to resolve forward references:
ChatListRead.model_rebuild()
MessageRead.model_rebuild()
BiasRead.model_rebuild()
