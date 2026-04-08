from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import resume, job, ranking
from app.database import Base, engine

# ✅ LOAD ALL MODELS
from app.models import *   # 🔥 CRITICAL

app = FastAPI(title="AI Resume Screening System")

# ✅ CREATE TABLES AFTER MODELS LOADED
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(resume.router)
app.include_router(job.router)
app.include_router(ranking.router)

@app.get("/")
def root():
    return {"message": "API running"}