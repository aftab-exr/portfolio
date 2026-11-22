from datetime import datetime, timezone
from sqlalchemy import Boolean, Column, DateTime, Integer, JSON, String, Text
from app.database import Base


def utcnow():
    return datetime.now(timezone.utc)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(160), nullable=False)
    tagline = Column(String(280), nullable=True)
    description = Column(Text, nullable=False)
    github_url = Column(String(500), nullable=False)
    live_url = Column(String(500), nullable=True)
    screenshot_path = Column(String(500), nullable=False)
    tech_stack = Column(JSON, default=list, nullable=False)
    highlights = Column(JSON, default=list, nullable=False)
    featured = Column(Boolean, default=False, nullable=False)
    display_order = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False)


class ProfileConfig(Base):
    __tablename__ = "profile_config"

    id = Column(Integer, primary_key=True, default=1)
    full_name = Column(String(120), nullable=False)
    role_title = Column(String(160), nullable=False)
    location = Column(String(120), nullable=False)
    bio = Column(Text, nullable=False)
    future_goals = Column(Text, nullable=False)
    skills = Column(JSON, default=list, nullable=False)
    github_username = Column(String(120), nullable=True)
    linkedin_url = Column(String(300), nullable=True)
    email = Column(String(200), nullable=True)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False)


class AssetRecord(Base):
    __tablename__ = "asset_records"

    id = Column(Integer, primary_key=True, index=True)
    asset_type = Column(String(32), unique=True, index=True, nullable=False)
    original_filename = Column(String(255), nullable=False)
    stored_path = Column(String(500), nullable=False)
    file_size_bytes = Column(Integer, nullable=False)
    version_label = Column(String(64), default="v1.0.0", nullable=False)
    extracted_text = Column(Text, nullable=True)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False)
