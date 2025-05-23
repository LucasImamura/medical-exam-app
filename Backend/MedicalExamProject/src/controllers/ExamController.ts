import { Request, Response } from "express";
import { ExamService } from "../services/ExamService";

export class ExamController {
  private examService = new ExamService();

  async create(req: Request, res: Response) {
    try {
      const { name, specialty } = req.body;
      const exam = await this.examService.createExam({ name, specialty });
      res.status(201).json(exam);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const exams = await this.examService.getAllExams();
      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const exam = await this.examService.getExamById(id);

      if (exam) {
        res.json(exam);
      } else {
        res.status(404).json({ error: "Exam not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { name, specialty } = req.body;

      const updatedExam = await this.examService.updateExam(id, {
        name,
        specialty,
      });

      if (updatedExam) {
        res.json(updatedExam);
      } else {
        res.status(404).json({ error: "Exam not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.examService.deleteExam(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBySpecialty(req: Request, res: Response) {
    try {
      const { specialty } = req.params;
      const exams = await this.examService.getExamsBySpecialty(specialty);
      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
