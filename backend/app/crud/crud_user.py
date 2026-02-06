from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session

from app.core import security
from app.crud.base import CRUDBase
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        password_hash = security.get_password_hash(obj_in.password)
        db_obj = User(
            email=obj_in.email,
            password_hash=password_hash,
            full_name=obj_in.full_name,
            is_active=obj_in.is_active,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]
    ) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if update_data.get("password"):
            password_hash = security.get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["password_hash"] = password_hash
        return super().update(db, db_obj=db_obj, obj_in=update_data)


user = CRUDUser(User)
