from typing import Optional
from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class RoomTypeBase(BaseModel):
    hotel_id: int
    name: str
    base_rate: Decimal
    capacity: Optional[int] = None


class RoomTypeCreate(RoomTypeBase):
    pass


class RoomTypeUpdate(RoomTypeBase):
    name: Optional[str] = None
    base_rate: Optional[Decimal] = None


class RoomTypeInDBBase(RoomTypeBase):
    id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class RoomType(RoomTypeInDBBase):
    pass


class RoomTypeInDB(RoomTypeInDBBase):
    pass
