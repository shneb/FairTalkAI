
from fastapi import HTTPException,status
from ..core.database import sessionLocal,engine
from ..users.models import User
from ..users.schema import  Token, LoginModel 
from datetime import timedelta
from ..core.security import get_pass_hash, verify_password
from ..core.config import get_settings
from ..core.security import create_access_token,create_refresh_token,get_token_payload

settings = get_settings()
session=sessionLocal(bind=engine)


async def get_user_token(user: LoginModel, refersh_token=None):
    payload={'id':str(user.id)}

    access_token_expiry = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    accesss_token =await create_access_token(payload,access_token_expiry)
    
    if not refersh_token:
        refersh_token =await create_refresh_token(payload)
    return Token(
        access_token=accesss_token,
        refresh_token=refersh_token,
        expires_in=access_token_expiry.seconds

    )

async def get_token (data, db):
    user=session.query(User).filter(User.email==data.username).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is not registered with us"
        )
    
    if not verify_password (data.password, user.password):  
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Invalid email and password")
    return await get_user_token(user= user)

async def get_refresh_token(token, db):
    payload = get_token_payload(token=token)  # Remove 'await' since get_token_payload is not async
    user_id = payload.get('id', None)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    # Assuming get_user_token is correctly asynchronous
    return await get_user_token(user=user, refersh_token=token)
