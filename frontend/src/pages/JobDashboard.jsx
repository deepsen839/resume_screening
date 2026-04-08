import "../styles/dashboard.css";
import { useParams, useNavigate } from "react-router-dom";

function JobDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      <h2>Job Dashboard</h2>

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