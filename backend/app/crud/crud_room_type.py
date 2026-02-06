from app.crud.base import CRUDBase
from app.models.room_type import RoomType
from app.schemas.room_type import RoomTypeCreate, RoomTypeUpdate


class CRUDRoomType(CRUDBase[RoomType, RoomTypeCreate, RoomTypeUpdate]):
    pass


room_type = CRUDRoomType(RoomType)
