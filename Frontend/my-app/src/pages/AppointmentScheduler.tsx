import React, { useState, useEffect } from "react";
import ScheduleSelector from "react-schedule-selector";
import axiosInstance from "../config/axiosInstance";
import "./AppointmentScheduler.css";

interface AppointmentSchedulerProps {
  examId: number;
}

interface Schedule {
  time: string; // ISO string of the scheduled time
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  examId,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null); // Single selected slot
  const [takenSlots, setTakenSlots] = useState<Date[]>([]); // Store taken slots
  const [observation, setObservation] = useState<string>(""); // Observation field
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTakenSlots = async () => {
      try {
        const response = await axiosInstance.get<Schedule[]>(
          `/api/schedules/exam/${examId}`
        );
        const takenTimes = response.data.map(
          (schedule) => new Date(schedule.time)
        );
        setTakenSlots(takenTimes);
      } catch (err) {
        setError("Failed to fetch taken slots. Please try again later.");
      }
    };

    fetchTakenSlots();
  }, [examId]);

  const handleChange = (newSlots: Date[]) => {
    if (newSlots.length === 0) {
      setSelectedSlot(null);
      setError(null);
      return;
    }

    const newSlot = newSlots[newSlots.length - 1]; // Get the most recently selected slot

    // Check if the slot is already taken
    const isTaken = takenSlots.some(
      (takenSlot) => takenSlot.getTime() === newSlot.getTime()
    );

    if (isTaken) {
      setError(
        "There is already a schedule for this exam during the requested time"
      );
      return;
    }

    setSelectedSlot(newSlot);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedSlot) {
      setError("Please select a time slot");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await axiosInstance.post("/api/schedules", {
        examId,
        time: selectedSlot.toISOString(),
        observations: observation, // Include the observation in the request
      });

      alert("Appointment scheduled successfully!");
      setSelectedSlot(null);
      setObservation(""); // Clear the observation field
    } catch (err) {
      setError(err.response?.data?.error || "Failed to schedule appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="scheduler-container">
      <h2>Select your time slot of preference</h2>
      <div className="schedule-selector-wrapper">
        <ScheduleSelector
          selection={selectedSlot ? [selectedSlot] : []} // Pass the single selected slot as an array
          numDays={7}
          minTime={8}
          maxTime={18}
          hourlyChunks={1}
          timeFormat="h:mma"
          onChange={handleChange}
          selectedColor="#3f51b5"
          unselectedColor="#ffffff"
          hoveredColor="#e0e0e0"
          renderDateCell={(datetime, selected, refSetter) => {
            const isTaken = takenSlots.some(
              (takenSlot) => takenSlot.getTime() === datetime.getTime()
            );

            return (
              <div
                ref={(instance) => {
                  if (instance) refSetter(instance);
                }}
                style={{
                  backgroundColor: isTaken
                    ? "#ffcccc"
                    : selected
                    ? "#3f51b5"
                    : "#ffffff",
                  border: "1px solid #ddd",
                  height: "100%",
                  width: "100%",
                }}
              />
            );
          }}
        />
      </div>

      <div className="observation-container">
        <label htmlFor="observation">Observations:</label>
        <textarea
          id="observation"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          placeholder="Add any additional details here..."
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button onClick={handleSubmit} disabled={isSubmitting || !selectedSlot}>
        {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
      </button>
    </div>
  );
};

export default AppointmentScheduler;
