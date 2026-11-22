from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.auth import verify_owner
from app.config import settings
from app.database import Base, SessionLocal, engine
from app.routers import ai, assets, profile, projects
from app.services.storage import ensure_upload_dirs


@asynccontextmanager
async def lifespan(app: FastAPI):
    ensure_upload_dirs()
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        profile.get_or_seed_profile(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    lifespan=lifespan,
)

origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ensure_upload_dirs()
app.mount("/uploads", StaticFiles(directory=settings.upload_dir), name="uploads")

app.include_router(projects.router)
app.include_router(assets.router)
app.include_router(profile.router)
app.include_router(ai.router)


@app.get("/api/health", tags=["System"])
def health_check():
    return {"status": "ok", "service": settings.app_name}


@app.get("/api/auth/verify", tags=["Auth"], dependencies=[Depends(verify_owner)])
def verify_owner_session():
    return {"authenticated": True}
