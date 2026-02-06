from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.main import api_v1_router

app = FastAPI(
    title="Hotel Admin API",
    description="Backend for an Internal Hotel Admin Tool",
    version="1.0.0",
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_v1_router, prefix="/api")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
