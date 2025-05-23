import { AppDataSource } from "../data-source"; // Import the DataSource
import { Schedule } from "../entities/Schedule";

export class ScheduleService {
  private scheduleRepository = AppDataSource.getRepository(Schedule);

  // Duration in milliseconds (1 hour)
  private readonly SLOT_DURATION = 60 * 60 * 1000;

  async createSchedule(scheduleData: Partial<Schedule>): Promise<Schedule> {
    // Calculate time range
    const startTime = new Date(scheduleData.time);
    const endTime = new Date(startTime.getTime() + this.SLOT_DURATION);

    // Check for conflicts
    const conflictingSchedules = await this.findConflictingSchedules(
      scheduleData.exam.id,
      startTime,
      endTime
    );

    if (conflictingSchedules.length > 0) {
      throw new Error(
        "There is already a schedule for this exam during the requested time"
      );
    }

    const schedule = this.scheduleRepository.create(scheduleData);
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
        `(schedule.time BETWEEN :startTime AND DATE_SUB(:endTime, INTERVAL 1 SECOND)
         OR DATE_ADD(schedule.time, INTERVAL ${
           this.SLOT_DURATION / 1000
         } SECOND) BETWEEN :startTime AND :endTime)`,
        { startTime, endTime }
      )
      .getMany();
  }
}
