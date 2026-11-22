from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth import verify_owner
from app.database import get_db
from app.models import ProfileConfig
from app.schemas import ProfileOut, ProfileUpdate

router = APIRouter(prefix="/api/profile", tags=["Profile"])


def get_or_seed_profile(db: Session) -> ProfileConfig:
    profile = db.query(ProfileConfig).filter(ProfileConfig.id == 1).first()
    if not profile:
        profile = ProfileConfig(
            id=1,
            full_name="Aaftab",
            role_title="Full-Stack & AI Systems Engineer",
            location="New Delhi, India",
            bio="Building deterministic full-stack web applications, mobile platforms, and AI-integrated developer tools.",
            future_goals="Architecting autonomous developer workflows, production-grade AI agents, and cross-platform software products.",
            skills=["Python", "FastAPI", "TypeScript", "Next.js", "React Native", "PostgreSQL", "Docker", "Gemini API"],
            github_username="aftab-exr",
            linkedin_url="",
            email="",
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile


@router.get("", response_model=ProfileOut)
def read_profile(db: Session = Depends(get_db)):
    return get_or_seed_profile(db)


@router.put("", response_model=ProfileOut, dependencies=[Depends(verify_owner)])
def update_profile(payload: ProfileUpdate, db: Session = Depends(get_db)):
    profile = get_or_seed_profile(db)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(profile, field, value)

    db.commit()
    db.refresh(profile)
    return profile
