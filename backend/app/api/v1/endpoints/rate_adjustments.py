from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud.crud_rate_adjustment import (
    rate_adjustment as crud_rate_adjustment,
)
from app.schemas.rate_adjustment import (
    RateAdjustment,
    RateAdjustmentCreate,
    RateAdjustmentUpdate,
)

router = APIRouter()


@router.post("/", response_model=RateAdjustment, status_code=status.HTTP_201_CREATED)
def create_rate_adjustment(
    *,
    db: Session = Depends(deps.get_db),
    rate_adjustment_in: RateAdjustmentCreate,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    return crud_rate_adjustment.create(db=db, obj_in=rate_adjustment_in)


@router.get("/", response_model=List[RateAdjustment])
def read_rate_adjustments(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    return crud_rate_adjustment.get_multi(db, skip=skip, limit=limit)


@router.get("/{rate_adjustment_id}", response_model=RateAdjustment)
def read_rate_adjustment(
    *,
    db: Session = Depends(deps.get_db),
    rate_adjustment_id: int,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    rate_adjustment = crud_rate_adjustment.get(db=db, id=rate_adjustment_id)
    if not rate_adjustment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="RateAdjustment not found"
        )
    return rate_adjustment


@router.put("/{rate_adjustment_id}", response_model=RateAdjustment)
def update_rate_adjustment(
    *,
    db: Session = Depends(deps.get_db),
    rate_adjustment_id: int,
    rate_adjustment_in: RateAdjustmentUpdate,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    rate_adjustment = crud_rate_adjustment.get(db=db, id=rate_adjustment_id)
    if not rate_adjustment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="RateAdjustment not found"
        )
    return crud_rate_adjustment.update(
        db=db, db_obj=rate_adjustment, obj_in=rate_adjustment_in
    )


@router.delete("/{rate_adjustment_id}", response_model=RateAdjustment)
def delete_rate_adjustment(
    *,
    db: Session = Depends(deps.get_db),
    rate_adjustment_id: int,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    rate_adjustment = crud_rate_adjustment.get(db=db, id=rate_adjustment_id)
    if not rate_adjustment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="RateAdjustment not found"
        )
    return crud_rate_adjustment.remove(db=db, id=rate_adjustment_id)