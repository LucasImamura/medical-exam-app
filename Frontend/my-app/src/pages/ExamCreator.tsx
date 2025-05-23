import React, { useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router";
import "./ExamCreator.css";

function ExamCreator(): React.JSX.Element {
  const [name, setName] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/exams", { name, specialty });
      navigate("/"); // Redirect to the exam list after creation
    } catch (err) {
      setError("Failed to create exam. Please try again.");
    }
  };

  return (
    <div className="exam-creator-container">
      <h1>Create a New Exam</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Exam Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="specialty">Specialty:</label>
          <input
            type="text"
            id="specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Exam</button>
      </form>
    </div>
  );
}

export default ExamCreator;
