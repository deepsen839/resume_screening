import "../styles/candidate.css";
import "../styles/card.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { rankCandidates, getJob } from "../api";

function Results() {
  const { id } = useParams();

  const [results, setResults] = useState([]);
  const [job, setJob] = useState(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    const [rankRes, jobRes] = await Promise.all([
      rankCandidates(id),
      getJob(id),
    ]);

    setResults(rankRes.data);
    console.log(jobRes.data);
    setJob(jobRes.data);
  };
return (
  <div className="results-layout">

    {/* LEFT SIDEBAR */}
    <div className="left-panel">
      {job && (
        <div className="card job-info">
          <h2>{job.title}</h2>

          <p>
            {job.description.length > 500
              ? job.description.slice(0, 500) + "..."
              : job.description}
          </p>
        </div>
      )}
    </div>

    {/* RIGHT CONTENT */}
    <div className="right-panel">

      <h2>Candidate Ranking</h2>

      {results.map((c, i) => (
        <div key={i} className="candidate-card">

          <div>
            <strong>{c.filename}</strong>
            <p>ID: {c.resume_id}</p>
          </div>

          <div className="score-box">
            <span>{(c.score * 100).toFixed(1)}%</span>
            <b>#{i + 1}</b>
          </div>

        </div>
      ))}

    </div>

  </div>
);
}

export default Results;