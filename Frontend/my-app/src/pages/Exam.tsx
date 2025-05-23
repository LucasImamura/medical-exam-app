import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axiosInstance from "../config/axiosInstance";
import "./Exam.css";

interface Exam {
  id: number;
  name: string;
}

function Exam(): React.JSX.Element {
  const [exams, setExams] = useState<Exam[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axiosInstance.get("/api/exams");
        setExams(response.data);
      } catch (err) {
        setError("Failed to fetch exams. Please try again later.");
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="exam-container">
      <h1>Please, select the exam you would like to schedule</h1>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {exams.map((exam) => (
          <li key={exam.id}>
            <Link to={`/appointmentscheduler/${exam.id}`}>{exam.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Exam;
