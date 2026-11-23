import mimetypes
import os
import uuid
from pathlib import Path
import fitz
import httpx
from fastapi import HTTPException, UploadFile, status
from app.config import settings

ALLOWED_IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp"}


def _use_supabase() -> bool:
    return bool(settings.supabase_url.strip() and settings.supabase_service_role_key.strip())


def _supabase_headers(content_type: str) -> dict[str, str]:
    key = settings.supabase_service_role_key.strip()
    return {
        "Authorization": f"Bearer {key}",
        "apikey": key,
        "Content-Type": content_type,
        "x-upsert": "true",
    }


def _supabase_public_url(object_path: str) -> str:
    base = settings.supabase_url.strip().rstrip("/")
    bucket = settings.supabase_bucket.strip()
    return f"{base}/storage/v1/object/public/{bucket}/{object_path}"


async def _upload_to_supabase(object_path: str, content: bytes, content_type: str) -> str:
    base = settings.supabase_url.strip().rstrip("/")
    bucket = settings.supabase_bucket.strip()
    upload_url = f"{base}/storage/v1/object/{bucket}/{object_path}"

    async with httpx.AsyncClient(timeout=60.0) as client:
        res = await client.post(upload_url, content=content, headers=_supabase_headers(content_type))

    if res.status_code not in (200, 201):
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Supabase Storage upload failed ({res.status_code}): {res.text}",
        )

    return _supabase_public_url(object_path)


def ensure_upload_dirs() -> None:
    for sub in ("screenshots", "resume", "apk"):
        Path(settings.upload_dir, sub).mkdir(parents=True, exist_ok=True)


async def save_screenshot(file: UploadFile) -> str:
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_IMAGE_EXTS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported image type {ext}",
        )

    content = await file.read()
    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Uploaded screenshot is empty.")

    filename = f"{uuid.uuid4().hex}{ext}"
    content_type = file.content_type or mimetypes.guess_type(filename)[0] or "image/jpeg"

    if _use_supabase():
        return await _upload_to_supabase(f"screenshots/{filename}", content, content_type)

    ensure_upload_dirs()
    dest = Path(settings.upload_dir) / "screenshots" / filename
    dest.write_bytes(content)
    return f"/uploads/screenshots/{filename}"


async def save_binary_asset(file: UploadFile, subdir: str, target_filename: str) -> tuple[str, int]:
    content = await file.read()
    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Uploaded file is empty.")

    content_type = (
        "application/pdf"
        if target_filename.endswith(".pdf")
        else "application/vnd.android.package-archive"
        if target_filename.endswith(".apk")
        else (file.content_type or "application/octet-stream")
    )

    if _use_supabase():
        public_url = await _upload_to_supabase(f"{subdir}/{target_filename}", content, content_type)
        return public_url, len(content)

    ensure_upload_dirs()
    dest = Path(settings.upload_dir) / subdir / target_filename
    dest.write_bytes(content)
    return str(dest), len(content)


def extract_pdf_text(pdf_path_or_url: str) -> str:
    try:
        if pdf_path_or_url.startswith(("http://", "https://")):
            res = httpx.get(pdf_path_or_url, timeout=30.0, follow_redirects=True)
            res.raise_for_status()
            doc = fitz.open(stream=res.content, filetype="pdf")
        else:
            doc = fitz.open(pdf_path_or_url)
        pages = [page.get_text("text") for page in doc]
        doc.close()
        return "\n".join(pages).strip()
    except Exception:
        return ""


def delete_upload_if_exists(public_or_abs_path: str) -> None:
    if not public_or_abs_path:
        return

    if public_or_abs_path.startswith(("http://", "https://")) and _use_supabase():
        bucket = settings.supabase_bucket.strip()
        marker = f"/storage/v1/object/public/{bucket}/"
        if marker in public_or_abs_path:
            object_path = public_or_abs_path.split(marker, 1)[1]
            base = settings.supabase_url.strip().rstrip("/")
            del_url = f"{base}/storage/v1/object/{bucket}/{object_path}"
            try:
                httpx.delete(del_url, headers=_supabase_headers("application/json"), timeout=15.0)
            except Exception:
                pass
        return

    if public_or_abs_path.startswith("/uploads/"):
        rel = public_or_abs_path.removeprefix("/uploads/")
        target = Path(settings.upload_dir) / rel
    else:
        target = Path(public_or_abs_path)

    if target.exists() and target.is_file():
        os.remove(target)
