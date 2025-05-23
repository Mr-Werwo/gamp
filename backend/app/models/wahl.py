from sqlmodel import SQLModel, Field
from typing import Optional

class Wahl(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    bezeichnung: str
