import { NavLink } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  return (
    <div className="header">
      <h2>AI Recruiter</h2>

      <div className="nav">
        <NavLink to="/" className="nav-link">Upload</NavLink>
        <NavLink to="/jobs" className="nav-link">Jobs</NavLink>
        <NavLink to="/results" className="nav-link">Results</NavLink>
      </div>
    </div>
  );
}