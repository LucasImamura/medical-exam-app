import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Exam } from "./Exam";

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp" })
  time: Date; // The start time of the 1-hour slot

  @ManyToOne(() => Exam, (exam) => exam.schedules)
  exam: Partial<Exam>;

  // @Column() // Had to create this column because the Exam entity was being required
  // examId: number;
}
