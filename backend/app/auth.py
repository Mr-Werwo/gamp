from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.config import ADMIN_USER, JWT_SECRET
import jwt
import datetime

router = APIRouter()

class LoginData(BaseModel):
    username: str
    password: str

@router.post("/auth/login")
def login(data: LoginData):
    if data.username != ADMIN_USER["username"] or data.password != ADMIN_USER["password"]:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt.encode({
        "sub": data.username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, JWT_SECRET, algorithm="HS256")

    return {"access_token": token}
