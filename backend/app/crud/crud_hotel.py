from app.crud.base import CRUDBase
from app.models.hotel import Hotel
from app.schemas.hotel import HotelCreate, HotelUpdate


class CRUDHotel(CRUDBase[Hotel, HotelCreate, HotelUpdate]):
    pass


hotel = CRUDHotel(Hotel)
