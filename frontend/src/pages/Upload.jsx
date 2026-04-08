import { useState } from "react";
import { uploadResume } from "../api";
import { useParams } from "react-router-dom";

import "../styles/upload.css";
import "../styles/card.css";

function Upload() {
  const { id } = useParams();
  const [files, setFiles] = useState([]);

  const handleFiles = async (fileList) => {
    const fileArray = Array.from(fileList);
    setFiles(fileArray);

    await uploadResume(fileArray, id);
    alert("Uploaded successfully!");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="upload-page">

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

          {/* BUTTON */}
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

        {/* FILE LIST */}
        {files.length > 0 && (
          <div className="file-list">
            {files.map((file, i) => (
              <div key={i} className="file-item">
                📄 {file.name}
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default Upload;