import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Exam } from "./Exam";

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp" })
  time: Date; // The start time of the 1-hour slot

  @Column({ type: "text", nullable: true })
  observations: string;

  @ManyToOne(() => Exam, (exam) => exam.schedules)
  exam: Partial<Exam>;
}
