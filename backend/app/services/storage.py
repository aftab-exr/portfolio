import os
import uuid
from pathlib import Path
import fitz
from fastapi import HTTPException, UploadFile, status
from app.config import settings

ALLOWED_IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp"}


def ensure_upload_dirs() -> None:
    for sub in ("screenshots", "resume", "apk"):
        Path(settings.upload_dir, sub).mkdir(parents=True, exist_ok=True)


async def save_screenshot(file: UploadFile) -> str:
    ensure_upload_dirs()
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_IMAGE_EXTS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported image type {ext}",
        )

    filename = f"{uuid.uuid4().hex}{ext}"
    dest = Path(settings.upload_dir) / "screenshots" / filename
    content = await file.read()
    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Uploaded screenshot is empty.")

    dest.write_bytes(content)
    return f"/uploads/screenshots/{filename}"


async def save_binary_asset(file: UploadFile, subdir: str, target_filename: str) -> tuple[str, int]:
    ensure_upload_dirs()
    dest = Path(settings.upload_dir) / subdir / target_filename
    content = await file.read()
    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Uploaded file is empty.")

    dest.write_bytes(content)
    return str(dest), len(content)


def extract_pdf_text(pdf_path: str) -> str:
    try:
        doc = fitz.open(pdf_path)
        pages = [page.get_text("text") for page in doc]
        doc.close()
        return "\n".join(pages).strip()
    except Exception:
        return ""


def delete_upload_if_exists(public_or_abs_path: str) -> None:
    if not public_or_abs_path:
        return
    if public_or_abs_path.startswith("/uploads/"):
        rel = public_or_abs_path.removeprefix("/uploads/")
        target = Path(settings.upload_dir) / rel
    else:
        target = Path(public_or_abs_path)

    if target.exists() and target.is_file():
        os.remove(target)
