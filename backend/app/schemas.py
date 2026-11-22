from datetime import datetime
from typing import List, Literal, Optional
from pydantic import BaseModel, Field


class ProjectOut(BaseModel):
    id: int
    title: str
    tagline: Optional[str] = None
    description: str
    github_url: str
    live_url: Optional[str] = None
    screenshot_url: str
    tech_stack: List[str] = []
    highlights: List[str] = []
    featured: bool
    display_order: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=160)
    tagline: Optional[str] = Field(None, max_length=280)
    description: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    highlights: Optional[List[str]] = None
    featured: Optional[bool] = None
    display_order: Optional[int] = None


class ProfileOut(BaseModel):
    full_name: str
    role_title: str
    location: str
    bio: str
    future_goals: str
    skills: List[str]
    github_username: Optional[str] = None
    linkedin_url: Optional[str] = None
    email: Optional[str] = None
    updated_at: datetime

    model_config = {"from_attributes": True}


class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    role_title: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    future_goals: Optional[str] = None
    skills: Optional[List[str]] = None
    github_username: Optional[str] = None
    linkedin_url: Optional[str] = None
    email: Optional[str] = None


class AssetStatusOut(BaseModel):
    asset_type: str
    available: bool
    original_filename: Optional[str] = None
    file_size_bytes: Optional[int] = None
    version_label: Optional[str] = None
    download_url: Optional[str] = None
    updated_at: Optional[datetime] = None


class EnhanceProjectRequest(BaseModel):
    raw_title: str = Field(..., min_length=1, max_length=160)
    github_url: str = Field(..., min_length=5, max_length=500)
    rough_notes: Optional[str] = Field(default="", max_length=2000)


class EnhanceProjectResponse(BaseModel):
    title: str = Field(..., description="Clean, direct project title")
    tagline: str = Field(..., description="One crisp sentence under 120 characters")
    description: str = Field(..., description="2-3 concise, concrete sentences explaining architecture and utility")
    tech_stack: List[str] = Field(..., description="Ordered list of core technologies, frameworks, and tools")
    highlights: List[str] = Field(..., description="3 to 5 concrete engineering or product capabilities")


class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1, max_length=2000)


class PortfolioChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    history: List[ChatTurn] = Field(default_factory=list, max_length=12)


class PortfolioChatResponse(BaseModel):
    reply: str
    referenced_projects: List[str] = Field(default_factory=list)
    suggested_questions: List[str] = Field(default_factory=list)
