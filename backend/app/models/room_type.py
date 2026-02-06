from datetime import datetime
from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class RoomType(Base):
    __tablename__ = "room_types"

    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"), nullable=False)
    name = Column(String, nullable=False)
    base_rate = Column(Numeric(10, 2), nullable=False) # 10 total digits, 2 after decimal
    capacity = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    hotel = relationship("Hotel", back_populates="room_types")
    rate_adjustments = relationship("RateAdjustment", back_populates="room_type")
