from app.crud.base import CRUDBase
from app.models.rate_adjustment import RateAdjustment
from app.schemas.rate_adjustment import RateAdjustmentCreate, RateAdjustmentUpdate


class CRUDRateAdjustment(
    CRUDBase[RateAdjustment, RateAdjustmentCreate, RateAdjustmentUpdate]
):
    pass


rate_adjustment = CRUDRateAdjustment(RateAdjustment)
