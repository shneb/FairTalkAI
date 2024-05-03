from sqlalchemy import Column, Integer, String, Text
from ..core.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer,primary_key=True)
    username =Column(String,default=True)
    email = Column(String,unique=True,nullable=False)
    password = Column(Text,nullable=True)
    chats = relationship("Chat", back_populates="user")
