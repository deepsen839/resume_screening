from fastapi import APIRouter
from app.database import SessionLocal
from app.models import Job, Resume
from app.services.vectorizer import vectorize
from app.services.matcher import rank_resumes

router = APIRouter(prefix="/ranking")


@router.get("/{job_id}")
def rank(job_id: int):
    db = SessionLocal()

    job = db.query(Job).filter(Job.id == job_id).first()

    # ✅ ONLY GET RESUMES FOR THIS JOB
    resumes = db.query(Resume).filter(Resume.job_id == job_id).all()

    resume_texts = [r.content for r in resumes]

    vectors = vectorize(job.description, resume_texts)
    ranked = rank_resumes(vectors)

    results = [
        {
            "resume_id": resumes[i].id,
            "filename": resumes[i].filename,
            "score": float(score)
        }
        for i, score in ranked
    ]

    db.close()
    return results