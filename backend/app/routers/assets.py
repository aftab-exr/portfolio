from pathlib import Path
from typing import List
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from fastapi.responses import FileResponse, RedirectResponse
from sqlalchemy.orm import Session
from app.auth import verify_owner
from app.database import get_db
from app.models import AssetRecord
from app.schemas import AssetStatusOut
from app.services.storage import extract_pdf_text, save_binary_asset

router = APIRouter(prefix="/api/assets", tags=["Assets"])


def _asset_exists(stored_path: str) -> bool:
    if not stored_path:
        return False
    if stored_path.startswith(("http://", "https://")):
        return True
    return Path(stored_path).exists()


def _build_status(db: Session, asset_type: str) -> AssetStatusOut:
    record = db.query(AssetRecord).filter(AssetRecord.asset_type == asset_type).first()
    if not record or not _asset_exists(record.stored_path):
        return AssetStatusOut(asset_type=asset_type, available=False)

    return AssetStatusOut(
        asset_type=asset_type,
        available=True,
        original_filename=record.original_filename,
        file_size_bytes=record.file_size_bytes,
        version_label=record.version_label,
        download_url=f"/api/assets/{asset_type}/latest",
        updated_at=record.updated_at,
    )


@router.get("/status", response_model=List[AssetStatusOut])
def get_assets_status(db: Session = Depends(get_db)):
    return [_build_status(db, "resume"), _build_status(db, "apk")]


@router.post("/resume", response_model=AssetStatusOut, dependencies=[Depends(verify_owner)])
async def upload_resume(
    version_label: str = Form("latest"),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if not (file.filename or "").lower().endswith(".pdf"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Resume must be a .pdf file")

    stored_path, size_bytes = await save_binary_asset(file, "resume", "resume_latest.pdf")
    parsed_text = extract_pdf_text(stored_path)

    record = db.query(AssetRecord).filter(AssetRecord.asset_type == "resume").first()
    if not record:
        record = AssetRecord(
            asset_type="resume",
            original_filename=file.filename or "resume.pdf",
            stored_path=stored_path,
            file_size_bytes=size_bytes,
            version_label=version_label,
            extracted_text=parsed_text,
        )
        db.add(record)
    else:
        record.original_filename = file.filename or "resume.pdf"
        record.stored_path = stored_path
        record.file_size_bytes = size_bytes
        record.version_label = version_label
        record.extracted_text = parsed_text

    db.commit()
    db.refresh(record)
    return _build_status(db, "resume")


@router.get("/resume/latest")
def download_latest_resume(db: Session = Depends(get_db)):
    record = db.query(AssetRecord).filter(AssetRecord.asset_type == "resume").first()
    if not record or not _asset_exists(record.stored_path):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume not uploaded yet")

    if record.stored_path.startswith(("http://", "https://")):
        return RedirectResponse(url=record.stored_path, status_code=status.HTTP_307_TEMPORARY_REDIRECT)

    return FileResponse(
        path=record.stored_path,
        media_type="application/pdf",
        filename=record.original_filename or "Resume.pdf",
    )


@router.post("/apk", response_model=AssetStatusOut, dependencies=[Depends(verify_owner)])
async def upload_apk(
    version_label: str = Form("v1.0.0"),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if not (file.filename or "").lower().endswith(".apk"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Android build must be an .apk file")

    stored_path, size_bytes = await save_binary_asset(file, "apk", "portfolio_latest.apk")

    record = db.query(AssetRecord).filter(AssetRecord.asset_type == "apk").first()
    if not record:
        record = AssetRecord(
            asset_type="apk",
            original_filename=file.filename or "portfolio.apk",
            stored_path=stored_path,
            file_size_bytes=size_bytes,
            version_label=version_label,
        )
        db.add(record)
    else:
        record.original_filename = file.filename or "portfolio.apk"
        record.stored_path = stored_path
        record.file_size_bytes = size_bytes
        record.version_label = version_label

    db.commit()
    db.refresh(record)
    return _build_status(db, "apk")


@router.get("/apk/latest")
def download_latest_apk(db: Session = Depends(get_db)):
    record = db.query(AssetRecord).filter(AssetRecord.asset_type == "apk").first()
    if not record or not _asset_exists(record.stored_path):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="APK release not uploaded yet")

    if record.stored_path.startswith(("http://", "https://")):
        return RedirectResponse(url=record.stored_path, status_code=status.HTTP_307_TEMPORARY_REDIRECT)

    return FileResponse(
        path=record.stored_path,
        media_type="application/vnd.android.package-archive",
        filename=record.original_filename or "Portfolio.apk",
    )
