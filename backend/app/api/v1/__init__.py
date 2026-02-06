from fastapi import APIRouter

from app.api.v1.endpoints import login, users, hotels, room_types, rate_adjustments

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(hotels.router, prefix="/hotels", tags=["hotels"])
api_router.include_router(room_types.router, prefix="/room-types", tags=["room types"])
api_router.include_router(rate_adjustments.router, prefix="/rate-adjustments", tags=["rate adjustments"])