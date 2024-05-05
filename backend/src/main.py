# main.py
import uvicorn
from fastapi import FastAPI
from .core.security import JWTAuth
from starlette.middleware.cors import CORSMiddleware
from .users.routers import user_router, router as guest_router
from .users import models as user_models
from .chat import models as chat_models
from .auth.route import auth_router
from .chat.routers import chat_router
from .core.database import engine
from starlette.middleware.authentication import AuthenticationMiddleware


app = FastAPI(debug=True)

# Create database tables
def create_tables():
    user_models.Base.metadata.create_all(bind=engine)
    chat_models.Base.metadata.create_all(bind=engine)

create_tables()


# Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)




app.include_router(guest_router)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(chat_router)

# add  middleware
app.add_middleware(AuthenticationMiddleware, backend=JWTAuth())

@app.get('/')
async def hello():
    return {"message":"Hello World"}

# Run the application
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
