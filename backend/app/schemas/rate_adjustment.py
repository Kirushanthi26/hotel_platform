from typing import Optional
from datetime import datetime, date
from decimal import Decimal

from pydantic import BaseModel


class RateAdjustmentBase(BaseModel):
    room_type_id: int
    amount: Decimal
    effective_date: date
    reason: Optional[str] = None
    created_by: Optional[int] = None


class RateAdjustmentCreate(RateAdjustmentBase):
    pass


class RateAdjustmentUpdate(RateAdjustmentBase):
    amount: Optional[Decimal] = None
    effective_date: Optional[date] = None
    reason: Optional[str] = None


class RateAdjustmentInDBBase(RateAdjustmentBase):
    id: Optional[int] = None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class RateAdjustment(RateAdjustmentInDBBase):
    pass


class RateAdjustmentInDB(RateAdjustmentInDBBase):
    pass
