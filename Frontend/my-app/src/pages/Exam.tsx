import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axiosInstance from "../config/axiosInstance";
import "./Exam.css";

interface Exam {
  id: number;
  name: string;
  specialty: string;
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
      <h1>Available Exams</h1>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Specialty</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>
                <Link to={`/appointmentscheduler/${exam.id}`}>{exam.name}</Link>
              </td>
              <td>{exam.specialty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Exam;
