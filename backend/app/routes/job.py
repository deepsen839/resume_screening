from fastapi import APIRouter
from app.database import SessionLocal
from app.models import Job
from pydantic import BaseModel

router = APIRouter(prefix="/job")


class JobCreate(BaseModel):
    title: str
    description: str


@router.post("/create")
def create_job(data: JobCreate):
    db = SessionLocal()

    job = Job(title=data.title, description=data.description)
    db.add(job)
    db.commit()
    db.close()

    return {"message": "Job created"}


@router.get("/")
def get_jobs():
    db = SessionLocal()
    jobs = db.query(Job).all()

    result = [
        {
            "id": job.id,
            "title": job.title,
            "description": job.description
        }
        for job in jobs
    ]

    db.close()
    return result

@router.get("/{job_id}")
def get_job(job_id: int):
    db = SessionLocal()
    print(id)
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        db.close()
        return {"error": "Job not found"}

    result = {
        "id": job.id,
        "title": job.title,
        "description": job.description
    }

    db.close()
    print(result)
    return result