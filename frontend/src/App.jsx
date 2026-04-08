import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Upload from "./pages/Upload";
import Jobs from "./pages/Jobs";
import Results from "./pages/Results";
import JobDashboard from "./pages/JobDashboard";

function App() {
  return (
    <Router>
      <Header />

      <div className="main-wrapper">
       <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/jobs" element={<Jobs />} />   {/* ✅ ADD THIS */}
          <Route path="/job/:id" element={<JobDashboard />} />
          <Route path="/upload/:id" element={<Upload />} />
          <Route path="/results/:id" element={<Results />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;