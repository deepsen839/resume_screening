import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>AI Recruiter</h2>

      <ul>
        <li>
          <NavLink to="/" className="nav-item">
            Upload
          </NavLink>
        </li>
        <li>
          <NavLink to="/jobs" className="nav-item">
            Jobs
          </NavLink>
        </li>
        <li>
          <NavLink to="/results" className="nav-item">
            Results
          </NavLink>
        </li>
      </ul>
    </div>
  );
}