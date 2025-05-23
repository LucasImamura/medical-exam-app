import { AppDataSource } from "../data-source";
import { Schedule } from "../entities/Schedule";
import { Exam } from "../entities/Exam";

export class ScheduleService {
  private scheduleRepository = AppDataSource.getRepository(Schedule);
  private examRepository = AppDataSource.getRepository(Exam);

  private readonly SLOT_DURATION = 60 * 60 * 1000;

  async createSchedule(
    scheduleData: Partial<Schedule>,
    examId: number
  ): Promise<Schedule> {
    const exam = await this.examRepository.findOneBy({ id: examId });
    if (!exam) {
      throw new Error("Exam not found");
    }

    // Calculate time range
    const startTime = new Date(scheduleData.time);
    const endTime = new Date(startTime.getTime() + this.SLOT_DURATION);

    // Check for conflicts
    const conflictingSchedules = await this.findConflictingSchedules(
      examId,
      startTime,
      endTime
    );

    if (conflictingSchedules.length > 0) {
      throw new Error(
        "There is already a schedule for this exam during the requested time"
      );
    }

    const schedule = this.scheduleRepository.create({
      ...scheduleData,
      exam,
    });

    return this.scheduleRepository.save(schedule);
  }

  async findConflictingSchedules(
    examId: number,
    startTime: Date,
    endTime: Date
  ): Promise<Schedule[]> {
    return this.scheduleRepository
      .createQueryBuilder("schedule")
      .where("schedule.examId = :examId", { examId })
      .andWhere(
        "(schedule.time BETWEEN :startTime AND :endTime OR :startTime BETWEEN schedule.time AND schedule.time + INTERVAL '1 hour')",
        { startTime, endTime }
      )
      .setParameters({ startTime, endTime })
      .getMany();
  }
}
