import "reflect-metadata";
import { DataSource } from "typeorm";
import { Exam } from "./entities/Exam";
import { Schedule } from "./entities/Schedule";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "YOUR_DB_USERNAME_HERE",
  password: "YOUR_DB_PASSWORD_HERE",
  database: "YOUR_DB_NAME_HERE",
  synchronize: true,
  logging: false,
  entities: [Exam, Schedule],
  migrations: [],
  subscribers: [],
});
