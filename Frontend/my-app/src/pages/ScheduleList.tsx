import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import "./ScheduleList.css";

interface Schedule {
  id: number;
  time: string;
  observations: string;
  exam: {
    name: string;
  };
}

function ScheduleList(): React.JSX.Element {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axiosInstance.get("/api/schedules");
        setSchedules(response.data);
      } catch (err) {
        setError("Failed to fetch schedules. Please try again later.");
      }
    };

    fetchSchedules();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/api/schedules/${id}`);
      setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
    } catch (err) {
      setError("Failed to delete schedule. Please try again later.");
    }
  };

  return (
    <div className="schedule-list-container">
      <h1>My Scheduled Exams</h1>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Exam type</th>
            <th>Scheduled date</th>
            <th>Observations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.exam.name}</td>
              <td>{new Date(schedule.time).toLocaleString()}</td>
              <td>{schedule.observations || "N/A"}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(schedule.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleList;
