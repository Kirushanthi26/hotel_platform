from fastapi import APIRouter

from app.api.v1 import api_router

api_v1_router = APIRouter()
api_v1_router.include_router(api_router, prefix="/v1")
