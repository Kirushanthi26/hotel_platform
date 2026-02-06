from datetime import datetime, date
from sqlalchemy import Column, Integer, Numeric, Date, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class RateAdjustment(Base):
    __tablename__ = "rate_adjustments"

    id = Column(Integer, primary_key=True, index=True)
    room_type_id = Column(Integer, ForeignKey("room_types.id"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False) # 10 total digits, 2 after decimal
    effective_date = Column(Date, nullable=False)
    reason = Column(Text, nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    room_type = relationship("RoomType", back_populates="rate_adjustments")
    creator = relationship("User")
