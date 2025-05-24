import { AppDataSource } from "../data-source";
import { Schedule } from "../entities/Schedule";
import { Exam } from "../entities/Exam";

export class ScheduleService {
  private scheduleRepository = AppDataSource.getRepository(Schedule);
  private examRepository = AppDataSource.getRepository(Exam);

  private readonly SLOT_DURATION = 60 * 60 * 1000 - 1;

  async getAllSchedules(): Promise<Schedule[]> {
    console.log("Fetching all schedules");
    return this.scheduleRepository.find({ relations: ["exam"] });
  }

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

    console.log("startTime", startTime);
    console.log("endTime", endTime);
    console.log("examId", examId);

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

    console.log("scheduleData", scheduleData);

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
        `(
          (schedule.time >= :startTime AND schedule.time < :endTime) OR
          (schedule.time + :slotDuration > :startTime AND schedule.time <= :startTime) OR
          (schedule.time <= :startTime AND schedule.time + :slotDuration >= :endTime)
        )`,
        {
          startTime,
          endTime,
          slotDuration: this.SLOT_DURATION,
        }
      )
      .getMany();
  }

  async getSchedulesByExam(examId: number): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      where: { exam: { id: examId } },
    });
  }
}
