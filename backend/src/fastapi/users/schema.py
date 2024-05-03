from pydantic import BaseModel
from typing import Optional

class SignUpModal(BaseModel):
    id : Optional[int]
    username :str
    email : str
    password : str

    class Config:
        orm_mode = True
        
class Token(BaseModel):
    access_token:str
    refresh_token:str
    token_typ:str = "Bearer"
    expires_in:int

    
class LoginModel(BaseModel):
    id:Optional[int]
    email:str
    password:str

    class Config:
        orm_mode=True