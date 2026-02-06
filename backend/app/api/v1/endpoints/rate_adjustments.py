from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def read_rate_adjustments():
    return {"message": "List of rate adjustments"}
