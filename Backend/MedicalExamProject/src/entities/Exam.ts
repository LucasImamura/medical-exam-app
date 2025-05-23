import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Schedule } from "./Schedule";

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @OneToMany(() => Schedule, (schedule) => schedule.exam)
  schedules: Schedule[];
}
