from fastapi import APIRouter, Request
from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from ..core.database import sessionLocal, engine
from .models import User
from .schema import SignUpModal
from fastapi.responses import JSONResponse
from ..core.database import get_db
from ..core.security import get_pass_hash
from ..core.security import oauth2_schema


router =APIRouter(
     prefix='/users',
     tags=['User']
)

user_router =APIRouter(
     prefix='/users',
     tags=['User'],
     dependencies=[Depends(oauth2_schema)]
)

session=sessionLocal(bind=engine)


@router.post('/signup', status_code=status.HTTP_201_CREATED)
async def signup(user: SignUpModal, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with the email already exists"
        )
    
    new_user = User(
        username=user.username,
        email=user.email,
        password=get_pass_hash(user.password)  # Hashing password
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return JSONResponse(content={"message": "User account has been successfully created."})

@user_router.post("/me",status_code=status.HTTP_200_OK,response_model=SignUpModal)
async def get_user_details(request:Request):
    return request.user