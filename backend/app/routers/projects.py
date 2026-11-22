import json
from typing import List, Optional
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session
from app.auth import verify_owner
from app.database import get_db
from app.models import Project
from app.schemas import ProjectOut, ProjectUpdate
from app.services.storage import delete_upload_if_exists, save_screenshot

router = APIRouter(prefix="/api/projects", tags=["Projects"])


def _to_project_out(project: Project) -> ProjectOut:
    return ProjectOut(
        id=project.id,
        title=project.title,
        tagline=project.tagline,
        description=project.description,
        github_url=project.github_url,
        live_url=project.live_url,
        screenshot_url=project.screenshot_path,
        tech_stack=project.tech_stack or [],
        highlights=project.highlights or [],
        featured=project.featured,
        display_order=project.display_order,
        created_at=project.created_at,
        updated_at=project.updated_at,
    )


def _parse_json_list(raw: Optional[str]) -> List[str]:
    if not raw:
        return []
    try:
        parsed = json.loads(raw)
        if isinstance(parsed, list):
            return [str(item).strip() for item in parsed if str(item).strip()]
    except json.JSONDecodeError:
        pass
    return [item.strip() for item in raw.split(",") if item.strip()]


@router.get("", response_model=List[ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    rows = (
        db.query(Project)
        .order_by(Project.featured.desc(), Project.display_order.asc(), Project.created_at.desc())
        .all()
    )
    return [_to_project_out(row) for row in rows]


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return _to_project_out(project)


@router.post("", response_model=ProjectOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(verify_owner)])
async def create_project(
    title: str = Form(...),
    description: str = Form(...),
    github_url: str = Form(...),
    tagline: Optional[str] = Form(None),
    live_url: Optional[str] = Form(None),
    tech_stack: Optional[str] = Form("[]"),
    highlights: Optional[str] = Form("[]"),
    featured: bool = Form(False),
    display_order: int = Form(0),
    screenshot: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    screenshot_url = await save_screenshot(screenshot)
    project = Project(
        title=title.strip(),
        tagline=tagline.strip() if tagline else None,
        description=description.strip(),
        github_url=github_url.strip(),
        live_url=live_url.strip() if live_url else None,
        screenshot_path=screenshot_url,
        tech_stack=_parse_json_list(tech_stack),
        highlights=_parse_json_list(highlights),
        featured=featured,
        display_order=display_order,
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return _to_project_out(project)


@router.patch("/{project_id}", response_model=ProjectOut, dependencies=[Depends(verify_owner)])
def update_project(project_id: int, payload: ProjectUpdate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(project, field, value)

    db.commit()
    db.refresh(project)
    return _to_project_out(project)


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(verify_owner)])
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    delete_upload_if_exists(project.screenshot_path)
    db.delete(project)
    db.commit()
