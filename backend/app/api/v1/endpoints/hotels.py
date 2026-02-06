from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def read_hotels():
    return {"message": "List of hotels"}
