from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.use import users_collection
from routes.auth_routes import auth_router

app = FastAPI()

allowed_origins = [
    "localhost",
    "http://localhost:5173"
]

app.add_middleware(CORSMiddleware, allow_origins=allowed_origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

app.include_router(router=auth_router)