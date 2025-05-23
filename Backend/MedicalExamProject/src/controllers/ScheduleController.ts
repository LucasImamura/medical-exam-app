import { Request, Response } from "express";
import { ScheduleService } from "../services/ScheduleService";

export class ScheduleController {
  private scheduleService = new ScheduleService();

  async create(req: Request, res: Response) {
    try {
      const { examId, time } = req.body;

      const schedule = await this.scheduleService.createSchedule(
        {
          time: new Date(time),
        },
        examId
      );

      res.status(201).json(schedule);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const schedules = await this.scheduleService.getAllSchedules();
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
