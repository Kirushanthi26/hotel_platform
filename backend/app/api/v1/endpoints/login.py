from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api import deps
from app.core import security
from app.core.config import settings
from app.core.database import get_db
from app.crud.crud_user import user as crud_user
from app.schemas.token import Token
from app.schemas.user import User as UserSchema


router = APIRouter()


@router.post("/login/access-token", response_model=Token)
def login_access_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """OAuth2 compatible token login, get an access token for future requests"""
    db_user = crud_user.get_by_email(db, email=form_data.username)
    if not db_user or not security.verify_password(
        plain_password=form_data.password, password_hash=db_user.password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return {
        "access_token": security.create_access_token(
            db_user.email, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/login/test-token", response_model=UserSchema)
def test_token(current_user: UserSchema = Depends(deps.get_current_user)):
    """Test access token"""
    return current_user
