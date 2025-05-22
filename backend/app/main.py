from fastapi import FastAPI
from app.database import create_db_and_tables
from app.auth import router as auth_router

app = FastAPI()
app.include_router(auth_router)

@app.on_event("startup")
def startup_event():
    create_db_and_tables()