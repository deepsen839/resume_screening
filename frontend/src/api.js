import axios from "axios";

const API = "http://localhost:8000";

export const uploadResume = (files, jobId) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  formData.append("job_id", jobId);  // ✅ IMPORTANT

  return axios.post("/api/resume/upload", formData);
};


export const createJob = (data) => {
  return axios.post(`${API}/job/create`, data);
};

export const getJobs = () => {
  return axios.get(`${API}/job/`);
};

export const rankCandidates = (jobId) => {
  return axios.get(`${API}/ranking/${jobId}`);
};

export const getJob = (jobId) => {return axios.get(`${API}/job/${jobId}`);};