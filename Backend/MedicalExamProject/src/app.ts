import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source"; // Import the DataSource
import { ScheduleController } from "./controllers/ScheduleController";
import { ExamController } from "./controllers/ExamController";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" })); // Replace with your frontend's URL

app.use(bodyParser.json());

// Database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    // Routes
    const scheduleController = new ScheduleController();
    const examController = new ExamController();

    app.get(
      "/api/schedules",
      scheduleController.getAll.bind(scheduleController)
    );
    app.post(
      "/api/schedules",
      scheduleController.create.bind(scheduleController)
    );
    app.get("/api/exams", examController.getAll.bind(examController));
    app.post("/api/exams", examController.create.bind(examController));
    app.get(
      "/api/schedules/exam/:examId",
      scheduleController.getByExam.bind(scheduleController)
    );
    app.delete(
      "/api/schedules/:id",
      scheduleController.delete.bind(scheduleController)
    );

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));

export default app;
