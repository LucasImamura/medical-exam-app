import React, { useState } from "react";
import ScheduleSelector from "react-schedule-selector";
import axiosInstance from "../config/axiosInstance";
import "./AppointmentScheduler.css";

interface AppointmentSchedulerProps {
  examId: number;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  examId,
}) => {
  const [selectedSlots, setSelectedSlots] = useState<Date[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (newSlots: Date[]) => {
    setSelectedSlots(newSlots);
    setError(null);
  };

  const handleSubmit = async () => {
    if (selectedSlots.length === 0) {
      setError("Please select at least one time slot");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // For multiple selections (if needed)
      for (const slot of selectedSlots) {
        await axiosInstance.post("/api/schedules", {
          examId,
          time: slot.toISOString(),
        });
      }

      alert("Appointment(s) scheduled successfully!");
      setSelectedSlots([]);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to schedule appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="scheduler-container">
      <h2>Select Available Time Slots</h2>
      <div className="schedule-selector-wrapper">
        <ScheduleSelector
          selection={selectedSlots}
          numDays={7}
          minTime={8}
          maxTime={18}
          hourlyChunks={1}
          timeFormat="h:mma"
          onChange={handleChange}
          selectedColor="#3f51b5"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting || selectedSlots.length === 0}
      >
        {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
      </button>
    </div>
  );
};

export default AppointmentScheduler;
