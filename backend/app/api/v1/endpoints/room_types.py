from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def read_room_types():
    return {"message": "List of room types"}
