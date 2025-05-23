import React from "react";
import { Routes, Route, useParams } from "react-router";
import Exam from "./pages/Exam";
import AppointmentScheduler from "./pages/AppointmentScheduler";
import ExamCreator from "./pages/ExamCreator";
import Toolbar from "./components/Toolbar";
import Home from "./pages/Home";
import ScheduleList from "./pages/ScheduleList";

function App(): React.JSX.Element {
  return (
    <>
      <Toolbar /> {/* Add the Toolbar */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/examcreator" element={<ExamCreator />} />
          <Route path="/exam" element={<Exam />} />
          <Route
            path="/appointmentscheduler/:examId"
            element={<AppointmentSchedulerWrapper />}
          />
          <Route path="/schedules" element={<ScheduleList />} />
        </Routes>
      </div>
    </>
  );
}

function AppointmentSchedulerWrapper(): React.JSX.Element {
  const { examId } = useParams<{ examId: string }>();
  return <AppointmentScheduler examId={Number(examId)} />;
}

export default App;
