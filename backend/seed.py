import logging
from datetime import date
from decimal import Decimal

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import SessionLocal
from app.crud.crud_user import user as crud_user
from app.crud.crud_hotel import hotel as crud_hotel
from app.crud.crud_room_type import room_type as crud_room_type
from app.crud.crud_rate_adjustment import rate_adjustment as crud_rate_adjustment
from app.schemas.user import UserCreate
from app.schemas.hotel import HotelCreate
from app.schemas.room_type import RoomTypeCreate
from app.schemas.rate_adjustment import RateAdjustmentCreate

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    # Create Superuser
    user = crud_user.get_by_email(db, email=settings.FIRST_SUPERUSER_EMAIL)
    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER_EMAIL,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            full_name="Admin User",
            is_active=True,
        )
        user = crud_user.create(db, obj_in=user_in)
        logger.info("Superuser created")

    # Create Hotel
    hotel_name = "Seaside Inn"
    existing_hotel = crud_hotel.get_multi(db, limit=1, skip=0) # Simple check if any hotel exists
    if not existing_hotel:
        hotel_in = HotelCreate(
            name=hotel_name,
            address="123 Ocean Drive",
            city="Colombo",
            country="Sri Lanka",
        )
        hotel = crud_hotel.create(db, obj_in=hotel_in)
        logger.info(f"Hotel '{hotel.name}' created")
    else:
        hotel = existing_hotel[0] # Use existing hotel if found
        logger.info(f"Using existing hotel '{hotel.name}'")

    # Create Room Types for the hotel
    room_type_standard_name = "Standard"
    room_type_deluxe_name = "Deluxe"

    existing_standard_room_type = db.query(crud_room_type.model).filter(
        crud_room_type.model.hotel_id == hotel.id,
        crud_room_type.model.name == room_type_standard_name
    ).first()

    if not existing_standard_room_type:
        standard_room_type_in = RoomTypeCreate(
            hotel_id=hotel.id,
            name=room_type_standard_name,
            base_rate=Decimal("100.00"),
            capacity=2,
        )
        standard_room_type = crud_room_type.create(db, obj_in=standard_room_type_in)
        logger.info(f"Room Type '{standard_room_type.name}' created for '{hotel.name}'")
    else:
        standard_room_type = existing_standard_room_type
        logger.info(f"Using existing Room Type '{standard_room_type.name}'")

    existing_deluxe_room_type = db.query(crud_room_type.model).filter(
        crud_room_type.model.hotel_id == hotel.id,
        crud_room_type.model.name == room_type_deluxe_name
    ).first()

    if not existing_deluxe_room_type:
        deluxe_room_type_in = RoomTypeCreate(
            hotel_id=hotel.id,
            name=room_type_deluxe_name,
            base_rate=Decimal("150.00"),
            capacity=4,
        )
        deluxe_room_type = crud_room_type.create(db, obj_in=deluxe_room_type_in)
        logger.info(f"Room Type '{deluxe_room_type.name}' created for '{hotel.name}'")
    else:
        deluxe_room_type = existing_deluxe_room_type
        logger.info(f"Using existing Room Type '{deluxe_room_type.name}'")

    # Create Rate Adjustment
    effective_date = date(2025, 12, 20)
    existing_rate_adjustment = db.query(crud_rate_adjustment.model).filter(
        crud_rate_adjustment.model.room_type_id == standard_room_type.id,
        crud_rate_adjustment.model.effective_date == effective_date
    ).first()

    if not existing_rate_adjustment:
        rate_adjustment_in = RateAdjustmentCreate(
            room_type_id=standard_room_type.id,
            amount=Decimal("20.00"),
            effective_date=effective_date,
            reason="peak season",
            created_by=user.id # Link to the superuser
        )
        rate_adjustment = crud_rate_adjustment.create(db, obj_in=rate_adjustment_in)
        logger.info(f"Rate Adjustment created for Room Type '{standard_room_type.name}' on {effective_date}")
    else:
        logger.info(f"Using existing Rate Adjustment for Room Type '{standard_room_type.name}' on {effective_date}")

def main() -> None:
    logger.info("Creating initial data")
    db = SessionLocal()
    init_db(db)
    db.close()
    logger.info("Initial data created")


if __name__ == "__main__":
    main()