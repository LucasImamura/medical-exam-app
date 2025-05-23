import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Home.css";

function Home(): React.JSX.Element {
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate("/examcreator");
  };

  const handlePatientClick = () => {
    setUserType("patient");
  };

  const handleExamViewClick = () => {
    navigate("/exam");
  };

  const handleScheduleViewClick = () => {
    navigate("/schedules");
  };

  return (
    <div className="home-container">
      {!userType && (
        <div className="home-container">
          <h1>Welcome to Medical Exam Scheduler!</h1>
          <h2>Please, inform what is your user type:</h2>
          <div className="user-type-buttons">
            <button onClick={handlePatientClick}>Patient</button>
            <button onClick={handleAdminClick}>Admin</button>
          </div>
        </div>
      )}
      {userType === "patient" && (
        <div className="home-container">
          <h1>Welcome to Medical Exam Scheduler!</h1>
          <h2>What would you like to do next?</h2>
          <div className="patient-options">
            <button onClick={handleExamViewClick}>View Exams</button>
            <button onClick={handleScheduleViewClick}>View Schedules</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
