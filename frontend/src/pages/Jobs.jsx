import { useState, useEffect } from "react";
import { createJob, getJobs } from "../api";
import { useNavigate } from "react-router-dom";

import "../styles/jobs.css";   // ✅ IMPORTANT
import "../styles/card.css";

function Jobs() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const res = await getJobs();
    setJobs(res.data);
  };

  const handleSubmit = async () => {
    if (!title || !desc) return;

    await createJob({ title, description: desc });

    setTitle("");
    setDesc("");
    loadJobs();
  };

  return (
    <div className="jobs-page">

      {/* FORM CARD */}
      <div className="card job-form">
        <h2>Create Job</h2>

        <input
          className="input"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea"
          placeholder="Job Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button className="button" onClick={handleSubmit}>
          Create Job
        </button>
      </div>

      {/* JOB LIST */}
      <h2 className="section-title">All Jobs</h2>

      <div className="job-list">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="job-card"
            onClick={() => navigate(`/job/${job.id}`)}
          >
            <h3>{job.title}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Jobs;