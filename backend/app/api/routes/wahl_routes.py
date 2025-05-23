from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.database import get_session
from app.models.wahl import Wahl
from typing import List

router = APIRouter()

@router.get("/wahl/", response_model=List[Wahl])
def get_all_wahlen(session: Session = Depends(get_session)):
    statement = select(Wahl)
    results = session.exec(statement).all()
    return results
