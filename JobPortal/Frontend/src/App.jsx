import axios from "axios";
import { useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [exp, setExp] = useState(0);
  const [skills, setSkills] = useState([]);
  const [excludeLocation, setExcludeLocation] = useState("");

  // Application form state
  const [applyData, setApplyData] = useState({
    jobId: "",
    applicantName: "",
    applicantEmail: "",
  });
  const [applications, setApplications] = useState([]);

  // Handle checkbox skill change
  const handleSkillChange = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const query = {
        location,
        exp: parseInt(exp) || 0,
        excludeLocation,
        skill: skills,
      };

      // Convert query to string
      const queryString = Object.entries(query)
        .filter(([_, v]) => v && (Array.isArray(v) ? v.length > 0 : true))
        .map(([k, v]) =>
          Array.isArray(v)
            ? v.map((val) => `${k}=${encodeURIComponent(val)}`).join("&")
            : `${k}=${encodeURIComponent(v)}`
        )
        .join("&");

      const { data } = await axios.get(`http://localhost:5000/jobs?${queryString}`);
      setJobs(data);
    } catch (err) {
      console.error(err);
      setJobs([]);
    }
  };

  // Open application form for a job
  const openApplyForm = (jobId) => {
    setApplyData({ ...applyData, jobId });
  };

  // Submit application
  const submitApplication = async () => {
    try {
      const res = await axios.post("http://localhost:5000/applications", applyData);
      alert("Application submitted!");
      setApplications([...applications, res.data]);
      setApplyData({ jobId: "", applicantName: "", applicantEmail: "" });
    } catch (err) {
      alert("Error submitting application: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Portal</h1>

      {/* Filters */}
      <div>
        <h3>Filters</h3>

        {/* Location filter */}
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All locations</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Gurugram">Gurugram</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        {/* Experience filter */}
        <label> Min Experience: {exp} yrs </label>
        <input
          type="range"
          min="0"
          max="10"
          value={exp}
          onChange={(e) => setExp(e.target.value)}
        />

        {/* Skills filter */}
        <div>
          <h4>Skills</h4>
          {["JavaScript", "Node.js", "Manual Testing", "Selenium", "Python", "Machine Learning"].map(
            (s) => (
              <label key={s} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  value={s}
                  checked={skills.includes(s)}
                  onChange={() => handleSkillChange(s)}
                />
                {s}
              </label>
            )
          )}
        </div>

        {/* Exclude location filter */}
        <select value={excludeLocation} onChange={(e) => setExcludeLocation(e.target.value)}>
          <option value="">All locations</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Gurugram">Gurugram</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        <button onClick={fetchJobs}>Search</button>
      </div>

      {/* Jobs List */}
      <div>
        <h2>Jobs</h2>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
              <h3>{job.title}</h3>
              <p>Location: {job.location}</p>
              <p>Experience: {job.experience} yrs</p>
              <p>Salary: {job.salary || "Not specified"}</p>
              <p>Skills: {job.skills.join(", ")}</p>
              <button onClick={() => openApplyForm(job._id)}>Apply</button>
            </div>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>

      {/* Application Form */}
      {applyData.jobId && (
        <div style={{ marginTop: "20px" }}>
          <h2>Apply for Job</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={applyData.applicantName}
            onChange={(e) => setApplyData({ ...applyData, applicantName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={applyData.applicantEmail}
            onChange={(e) => setApplyData({ ...applyData, applicantEmail: e.target.value })}
          />
          <button onClick={submitApplication}>Submit Application</button>
        </div>
      )}

      {/* Applications List */}
      <div style={{ marginTop: "20px" }}>
        <h2>Submitted Applications</h2>
        {applications.length > 0 ? (
          <ul>
            {applications.map((app) => (
              <li key={app._id}>
                {app.applicantName} ({app.applicantEmail}) applied for {jobs.find(j => j._id === app.jobId)?.title || "Job"} - Status: {app.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>No applications submitted yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
