from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import router as auth_router
from app.api.routes.wahl_routes import router as wahl_router
from app.api.routes.wahlbezirk_routes import router as bezirk_router


app = FastAPI()

origins = ["http://45.92.217.114:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins   = origins,
    allow_credentials = True,
    allow_methods   = ["*"],
    allow_headers   = ["*"],
)

app.include_router(auth_router)
app.include_router(wahl_router)
app.include_router(bezirk_router)
