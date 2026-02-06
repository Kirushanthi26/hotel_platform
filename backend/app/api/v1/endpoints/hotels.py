from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud.crud_hotel import hotel as crud_hotel
from app.schemas.hotel import Hotel, HotelCreate, HotelUpdate

router = APIRouter()


@router.post("/", response_model=Hotel, status_code=status.HTTP_201_CREATED)
def create_hotel(
    *,
    db: Session = Depends(deps.get_db),
    hotel_in: HotelCreate,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    return crud_hotel.create(db=db, obj_in=hotel_in)


@router.get("/", response_model=List[Hotel])
def read_hotels(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    return crud_hotel.get_multi(db, skip=skip, limit=limit)


@router.get("/{hotel_id}", response_model=Hotel)
def read_hotel(
    *,
    db: Session = Depends(deps.get_db),
    hotel_id: int,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    hotel = crud_hotel.get(db=db, id=hotel_id)
    if not hotel:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hotel not found")
    return hotel


@router.put("/{hotel_id}", response_model=Hotel)
def update_hotel(
    *,
    db: Session = Depends(deps.get_db),
    hotel_id: int,
    hotel_in: HotelUpdate,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    hotel = crud_hotel.get(db=db, id=hotel_id)
    if not hotel:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hotel not found")
    return crud_hotel.update(db=db, db_obj=hotel, obj_in=hotel_in)


@router.delete("/{hotel_id}", response_model=Hotel)
def delete_hotel(
    *,
    db: Session = Depends(deps.get_db),
    hotel_id: int,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    hotel = crud_hotel.get(db=db, id=hotel_id)
    if not hotel:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hotel not found")
    return crud_hotel.remove(db=db, id=hotel_id)