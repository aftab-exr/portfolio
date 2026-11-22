import json
from typing import List
from fastapi import HTTPException, status
from google import genai
from google.genai import types
from sqlalchemy.orm import Session
from app.config import settings
from app.models import AssetRecord, ProfileConfig, Project
from app.schemas import (
    ChatTurn,
    EnhanceProjectRequest,
    EnhanceProjectResponse,
    PortfolioChatResponse,
)
from app.services.github import fetch_repo_context

GEMINI_MODEL = "gemini-2.5-flash"


def _get_client() -> genai.Client:
    if not settings.gemini_api_key.strip():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="GEMINI_API_KEY is not configured on the server.",
        )
    return genai.Client(api_key=settings.gemini_api_key.strip())


async def enhance_project_with_ai(payload: EnhanceProjectRequest) -> EnhanceProjectResponse:
    client = _get_client()
    repo_ctx = await fetch_repo_context(payload.github_url)

    system_instruction = (
        "You are a senior technical editor refining software engineering portfolio entries. "
        "Write with exaggerated minimalism: concrete, architectural, direct, zero fluff. "
        "STRICTLY FORBIDDEN words: Elevate, Seamless, Unleash, Next-Gen, Revolutionary, Cutting-edge, Game-changer. "
        "Never use emojis. Base claims strictly on the provided title, notes, and GitHub repository metadata."
    )

    notes_text = payload.rough_notes or "None provided"
    prompt = (
        f"Raw Title: {payload.raw_title}\n"
        f"GitHub URL: {payload.github_url}\n"
        f"Rough Notes: {notes_text}\n\n"
        f"GitHub Repo Context:\n{json.dumps(repo_ctx, indent=2)}\n\n"
        "Generate a sharp, accurate portfolio entry with title, tagline, description, tech_stack, and highlights."
    )

    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                response_schema=EnhanceProjectResponse,
                temperature=0.3,
            ),
        )
        if response.parsed is not None:
            return response.parsed
        return EnhanceProjectResponse.model_validate_json(response.text)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI project enhancement failed: {str(exc)}",
        )


def _build_portfolio_grounding(db: Session) -> str:
    profile = db.query(ProfileConfig).filter(ProfileConfig.id == 1).first()
    projects = (
        db.query(Project)
        .order_by(Project.featured.desc(), Project.display_order.asc(), Project.created_at.desc())
        .all()
    )
    resume = db.query(AssetRecord).filter(AssetRecord.asset_type == "resume").first()

    sections: List[str] = []

    if profile:
        skills_str = ", ".join(profile.skills or [])
        sections.append(
            "=== OWNER PROFILE ===\n"
            f"Name: {profile.full_name}\n"
            f"Role: {profile.role_title}\n"
            f"Location: {profile.location}\n"
            f"Bio: {profile.bio}\n"
            f"Future Goals: {profile.future_goals}\n"
            f"Core Skills: {skills_str}\n"
            f"GitHub: {profile.github_username or 'N/A'}\n"
            f"LinkedIn: {profile.linkedin_url or 'N/A'}\n"
            f"Email: {profile.email or 'N/A'}"
        )

    if projects:
        proj_lines = ["=== PORTFOLIO PROJECTS ==="]
        for idx, p in enumerate(projects, start=1):
            tagline_str = p.tagline or ""
            stack_str = ", ".join(p.tech_stack or [])
            highlights_str = "; ".join(p.highlights or [])
            live_str = p.live_url or "N/A"
            proj_lines.append(
                f"{idx}. {p.title} ({tagline_str})\n"
                f"   Description: {p.description}\n"
                f"   Tech Stack: {stack_str}\n"
                f"   Highlights: {highlights_str}\n"
                f"   GitHub: {p.github_url}\n"
                f"   Live URL: {live_str}"
            )
        sections.append("\n".join(proj_lines))
    else:
        sections.append("=== PORTFOLIO PROJECTS ===\nNo projects published yet.")

    if resume and resume.extracted_text:
        sections.append(
            "=== LATEST RESUME CONTENT ===\n"
            f"{resume.extracted_text[:6000]}"
        )

    return "\n\n".join(sections)


def chat_with_portfolio(
    message: str,
    history: List[ChatTurn],
    db: Session,
) -> PortfolioChatResponse:
    client = _get_client()
    grounding_context = _build_portfolio_grounding(db)

    system_instruction = (
        "You are the official AI Portfolio Assistant representing the engineer described in the context below. "
        "Answer questions from recruiters, clients, and collaborators about the engineer, their projects, tech stack, "
        "experience, resume details, and future goals. "
        "Rules:\n"
        "1. Rely strictly on the provided Portfolio Context. Never fabricate projects, employers, or metrics.\n"
        "2. If a detail is not in the context, state clearly that it is not listed yet and invite them to reach out directly.\n"
        "3. Keep answers crisp, high-signal, and direct. No emojis. Avoid buzzwords like Elevate, Seamless, or Unleash.\n"
        "4. Include up to 3 relevant project titles in referenced_projects and 2-3 natural follow-up prompts in suggested_questions.\n\n"
        f"{grounding_context}"
    )

    transcript_lines: List[str] = []
    for turn in history[-8:]:
        speaker = "Visitor" if turn.role == "user" else "Assistant"
        transcript_lines.append(f"{speaker}: {turn.content}")
    transcript_lines.append(f"Visitor: {message}")

    prompt = "\n".join(transcript_lines)

    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                response_schema=PortfolioChatResponse,
                temperature=0.4,
            ),
        )
        if response.parsed is not None:
            return response.parsed
        return PortfolioChatResponse.model_validate_json(response.text)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Portfolio AI chat failed: {str(exc)}",
        )
