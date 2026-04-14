import { useState, useEffect } from "react";
import { createJob, getJobs } from "../api";
import { Link, useNavigate } from "react-router-dom";

import "../styles/jobs.css";
import "../styles/card.css";

function Jobs() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [jobs, setJobs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

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

  // Pagination logic
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="jobs-page">

      {/* FORM */}
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

      {/* TABLE */}
      <h2 className="section-title">All Jobs</h2>

      <div className="table-container">
        <table className="job-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Description</th>
              <th>Job Details</th>
            </tr>
          </thead>

          <tbody>
            {currentJobs.map((job, index) => (
              <tr
                key={job.id}
                onClick={() => navigate(`/job/${job.id}`)}
              >
                <td>{startIndex + index + 1}</td>
                <td>{job.title}</td>
                <td>
                  {job.description.length > 120
                    ? job.description.slice(0, 120) + "..."
                    : job.description}
                </td>
               <td>
  <Link to={`/job/${job.id}`}>Job Details</Link>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default Jobs;