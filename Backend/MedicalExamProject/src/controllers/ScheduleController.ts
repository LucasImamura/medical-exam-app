import { Request, Response } from "express";
import { ScheduleService } from "../services/ScheduleService";

export class ScheduleController {
  private scheduleService = new ScheduleService();

  async create(req: Request, res: Response) {
    try {
      const { examId, observations, time } = req.body;

      const schedule = await this.scheduleService.createSchedule(
        {
          time: new Date(time),
          observations: observations,
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

  async getByExam(req: Request, res: Response) {
    try {
      const examId = parseInt(req.params.examId);
      const schedules = await this.scheduleService.getSchedulesByExam(examId);
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
