from typing import Optional
from datetime import datetime

from pydantic import BaseModel


class HotelBase(BaseModel):
    name: str
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None


class HotelCreate(HotelBase):
    pass


class HotelUpdate(HotelBase):
    pass


class HotelInDBBase(HotelBase):
    id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class Hotel(HotelInDBBase):
    pass


class HotelInDB(HotelInDBBase):
    pass
