from sqlalchemy import Column, Integer, String, Text,ForeignKey
from app.database import Base

class Job(Base):
    __tablename__ = "job"   # ✅ EXACT NAME

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)


class Resume(Base):
    __tablename__ = "resume"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    content = Column(String)

    job_id = Column(Integer, ForeignKey("job.id"))   # ✅ MATCHES ABOVE   # ✅ ADD THIS