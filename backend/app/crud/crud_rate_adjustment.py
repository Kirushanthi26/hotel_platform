from datetime import date # Import date
from typing import Any, Dict, List, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import Base
from app.crud.base import CRUDBase
from app.models.rate_adjustment import RateAdjustment
from app.schemas.rate_adjustment import RateAdjustmentCreate, RateAdjustmentUpdate


class CRUDRateAdjustment(
    CRUDBase[RateAdjustment, RateAdjustmentCreate, RateAdjustmentUpdate]
):
    def create(self, db: Session, *, obj_in: RateAdjustmentCreate) -> RateAdjustment:
        # Convert obj_in to a dict
        obj_in_data = obj_in.dict()  # Use .dict() for direct Pydantic model to dict conversion

        # Ensure effective_date is a date object
        if isinstance(obj_in_data.get("effective_date"), str):
            obj_in_data["effective_date"] = date.fromisoformat(obj_in_data["effective_date"])
        
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


rate_adjustment = CRUDRateAdjustment(RateAdjustment)