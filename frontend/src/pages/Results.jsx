import "../styles/candidate.css";
import "../styles/card.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { rankCandidates } from "../api";

function Results() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    rankCandidates(id).then((res) => setResults(res.data));
  }, [id]);

  return (
    <div className="results-container">

      <h2>Candidate Ranking</h2>

      {results.map((c, i) => (
        <div key={i} className="candidate-card">

          <div>
            <strong>{c.filename}</strong>
            <p>ID: {c.resume_id}</p>
          </div>

          <div>
            <span>{(c.score * 100).toFixed(1)}%</span>
            <b>#{i + 1}</b>
          </div>

        </div>
      ))}

    </div>
  );
}

export default Results;