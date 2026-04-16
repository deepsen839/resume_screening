import { useState, useEffect } from "react";
import { uploadResume, getJob } from "../api";
import { useParams,useNavigate } from "react-router-dom";

import "../styles/upload.css";
import "../styles/card.css";

function Upload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleFiles = async (fileList) => {
    const fileArray = Array.from(fileList);

    // ✅ simple validation
    const validFiles = fileArray.filter((file) =>
      file.name.endsWith(".pdf") || file.name.endsWith(".docx")
    );

    if (validFiles.length === 0) {
      alert("Only PDF or DOCX files allowed!");
      return;
    }

    setFiles(validFiles);

    try {
      setLoading(true);
      await uploadResume(validFiles, id);
      alert("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

const handleDrop = async (e) => {
  e.preventDefault();

  const items = e.dataTransfer.items;
  let allFiles = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i].webkitGetAsEntry();
    if (item) {
      const files = await readEntry(item);
      allFiles = allFiles.concat(files);
    }
  }

  handleFiles(allFiles);
};

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };
  const readEntry = (entry) => {
  return new Promise((resolve) => {
    if (entry.isFile) {
      entry.file((file) => resolve([file]));
    } 
    else if (entry.isDirectory) {
      const dirReader = entry.createReader();
      dirReader.readEntries(async (entries) => {
        let files = [];

        for (let ent of entries) {
          const res = await readEntry(ent);
          files = files.concat(res);
        }

        resolve(files);
      });
    }
  });
};

  return (
    <div className="upload-page">

      {/* JOB INFO */}
      {job && (
        <div className="card job-info">
          <h2>{job.title}</h2>
          <p>
            {job.description.length > 200
              ? job.description.slice(0, 200) + "..."
              : job.description}
          </p>
        </div>
      )}

      <div className="card upload-card">

        <h2>Upload Resumes</h2>

        {/* DROP ZONE */}
        <div
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>Drag & Drop resumes here</p>
          <span>or</span>

          <label className="upload-btn">
            Browse Files
           <input
                type="file"
                multiple
                webkitdirectory="true"
                onChange={handleChange}
                className="hidden-input"
              />
          </label>
        </div>

        {/* LOADING */}
        {loading && <p className="uploading">Uploading...</p>}

        {/* FILE LIST */}
        {files.length > 0 && (
  <>
    <div className="file-list">
      {files.map((file, i) => (
        <div key={i} className="file-item">
          📄 {file.name}
        </div>
      ))}
    </div>

    {/* ✅ VIEW RESULT BUTTON */}
    <button
      className="view-btn"
      onClick={() => navigate(`/results/${id}`)}
      disabled={loading}
    >
      View Candidates
    </button>
  </>
)}

      </div>

    </div>
  );
}

export default Upload;