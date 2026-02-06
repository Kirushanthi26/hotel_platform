from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud.crud_room_type import room_type as crud_room_type
from app.schemas.room_type import RoomType, RoomTypeCreate, RoomTypeUpdate

router = APIRouter()


@router.post("/", response_model=RoomType, status_code=status.HTTP_201_CREATED)
def create_room_type(
    *,
    db: Session = Depends(deps.get_db),
    room_type_in: RoomTypeCreate,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    return crud_room_type.create(db=db, obj_in=room_type_in)


@router.get("/", response_model=List[RoomType])
def read_room_types(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    return crud_room_type.get_multi(db, skip=skip, limit=limit)


@router.get("/{room_type_id}", response_model=RoomType)
def read_room_type(
    *,
    db: Session = Depends(deps.get_db),
    room_type_id: int,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    room_type = crud_room_type.get(db=db, id=room_type_id)
    if not room_type:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="RoomType not found")
    return room_type


@router.put("/{room_type_id}", response_model=RoomType)
def update_room_type(
    *,
    db: Session = Depends(deps.get_db),
    room_type_id: int,
    room_type_in: RoomTypeUpdate,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    room_type = crud_room_type.get(db=db, id=room_type_id)
    if not room_type:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="RoomType not found")
    return crud_room_type.update(db=db, db_obj=room_type, obj_in=room_type_in)


@router.delete("/{room_type_id}", response_model=RoomType)
def delete_room_type(
    *,
    db: Session = Depends(deps.get_db),
    room_type_id: int,
    current_user: deps.DBUser = Depends(deps.get_current_active_user),
):
    room_type = crud_room_type.get(db=db, id=room_type_id)
    if not room_type:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="RoomType not found")
    return crud_room_type.remove(db=db, id=room_type_id)