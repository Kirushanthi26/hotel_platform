from fastapi import FastAPI

from app.api.main import api_v1_router

app = FastAPI(
    title="Hotel Admin API",
    description="Backend for an Internal Hotel Admin Tool",
    version="1.0.0",
)

app.include_router(api_v1_router, prefix="/api")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
