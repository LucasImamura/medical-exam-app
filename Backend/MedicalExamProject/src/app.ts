import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source"; // Import the DataSource
import { ScheduleController } from "./controllers/ScheduleController";
import { ExamController } from "./controllers/ExamController";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    // Routes
    const scheduleController = new ScheduleController();
    const examController = new ExamController();

    app.post(
      "/api/schedules",
      scheduleController.create.bind(scheduleController)
    );
    app.get("/api/exams", examController.getAll.bind(examController));
    app.post("/api/exams", examController.create.bind(examController));

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));

export default app;
