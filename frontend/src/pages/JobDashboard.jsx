import "../styles/dashboard.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJob } from "../api";

function JobDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const res = await getJob(id);
      setJob(res.data);
    } catch (err) {
      console.error("Error loading job:", err);
    }
  };

  return (
    <div className="dashboard">

      {/* JOB INFO */}
      {job && (
        <div className="job-header">
          <h2>{job.title}</h2>
          <p>
            {job.description.length > 300
              ? job.description.slice(0, 300) + "..."
              : job.description}
          </p>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="actions">
        <button onClick={() => navigate(`/upload/${id}`)}>
          Upload Resumes
        </button>

        <button onClick={() => navigate(`/results/${id}`)}>
          View Candidates
        </button>
      </div>

    </div>
  );
}

export default JobDashboard;