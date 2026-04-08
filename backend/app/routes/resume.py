from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.services.parser import extract_text
from app.database import SessionLocal
from app.models import Resume

router = APIRouter(prefix="/resume")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


from typing import List
from fastapi import UploadFile, File
from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.services.parser import extract_text
from app.database import SessionLocal
from app.models import Resume

router = APIRouter(prefix="/resume")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


from fastapi import UploadFile, File, Form
from typing import List

import os
import shutil

@router.post("/upload")
async def upload_resume(
    files: List[UploadFile] = File(...),
    job_id: int = Form(...)
):
    db = SessionLocal()

    for file in files:
        try:
            # ✅ Preserve folder structure
            file_path = os.path.join(UPLOAD_DIR, file.filename)

            # ✅ Create folders if not exist
            os.makedirs(os.path.dirname(file_path), exist_ok=True)

            # ✅ Save file
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            text = extract_text(file_path) or ""

            resume = Resume(
                filename=file.filename,
                content=text,
                job_id=job_id
            )

            db.add(resume)

        except Exception as e:
            print("ERROR:", file.filename, str(e))

    db.commit()
    db.close()

    return {"message": "Resumes uploaded"}