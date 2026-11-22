import secrets
from fastapi import Header, HTTPException, status
from app.config import settings


def verify_owner(x_owner_key: str = Header(..., alias="X-Owner-Key")) -> bool:
    if not secrets.compare_digest(x_owner_key.encode("utf-8"), settings.owner_api_key.encode("utf-8")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid owner credentials",
        )
    return True
