from sqlmodel import SQLModel, Field, Column
from typing import Optional

class Wahlbezirk(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    bezirksnummer: str = Field(sa_column=Column(unique=True))
    uwb: Optional[str]
    uwb3: Optional[str]
    bwb: Optional[str]
    bwb3: Optional[str]
    awk: Optional[str]
    bez: Optional[str]
    bwk: Optional[str]
    geom: str  # als WKT oder GeoJSON als Text
