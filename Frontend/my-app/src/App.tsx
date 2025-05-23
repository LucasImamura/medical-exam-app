import React from "react";
import { Routes, Route, useParams } from "react-router";
import Exam from "./pages/Exam";
import AppointmentScheduler from "./pages/AppointmentScheduler";
import ExamCreator from "./pages/ExamCreator";

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Exam />} />
      <Route
        path="/appointmentscheduler/:examId"
        element={<AppointmentSchedulerWrapper />}
      />
      <Route path="/examcreator" element={<ExamCreator />} />
    </Routes>
  );
}

function AppointmentSchedulerWrapper(): React.JSX.Element {
  const { examId } = useParams<{ examId: string }>();
  return <AppointmentScheduler examId={Number(examId)} />;
}

export default App;
