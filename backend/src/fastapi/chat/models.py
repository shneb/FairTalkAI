from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..core.database import Base

class Chat(Base):
    __tablename__ = 'chats'
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, default="New chat", nullable=False)  # Set a default value for title
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    user_id = Column(Integer, ForeignKey('users.id'))
    messages = relationship("Message", back_populates="chat", cascade="all, delete, delete-orphan")
    user = relationship("User", back_populates="chats")


class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(Text, nullable=False)
    role = Column(String(10), nullable=False)  # e.g., 'user' or 'assistant'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    chat_id = Column(Integer, ForeignKey('chats.id', ondelete="CASCADE"))
    chat = relationship("Chat", back_populates="messages")
    bias_id = Column(Integer, ForeignKey('biases.id'))
    bias = relationship("Bias", back_populates="messages")

class Bias(Base):
    __tablename__ = 'biases'
    id = Column(Integer, primary_key=True, autoincrement=True)
    score = Column(String(10), nullable=False)
    type = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    messages = relationship("Message", back_populates="bias", cascade="all, delete, delete-orphan")

