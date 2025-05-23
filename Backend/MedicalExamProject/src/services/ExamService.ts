import { AppDataSource } from "../data-source"; // Import the DataSource
import { Exam } from "../entities/Exam";

export class ExamService {
  private examRepository = AppDataSource.getRepository(Exam);

  async createExam(examData: Partial<Exam>): Promise<Exam> {
    const exam = this.examRepository.create(examData);
    return this.examRepository.save(exam);
  }

  async getAllExams(): Promise<Exam[]> {
    return this.examRepository.find({ relations: ["schedules"] });
  }

  async getExamById(id: number): Promise<Exam | undefined> {
    return this.examRepository.findOne({
      where: { id },
      relations: ["schedules"],
    });
  }

  async updateExam(
    id: number,
    examData: Partial<Exam>
  ): Promise<Exam | undefined> {
    await this.examRepository.update(id, examData);
    return this.getExamById(id);
  }

  async deleteExam(id: number): Promise<void> {
    await this.examRepository.delete(id);
  }

  async getExamsBySpecialty(specialty: string): Promise<Exam[]> {
    return this.examRepository.find({
      where: { specialty },
      relations: ["schedules"],
    });
  }
}
