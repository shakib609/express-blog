import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_SETTINGS, DEBUG } from "./constants";
// import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_SETTINGS.DB_HOST,
  port: DB_SETTINGS.DB_PORT,
  username: DB_SETTINGS.DB_USER,
  password: DB_SETTINGS.DB_PASSWORD,
  database: DB_SETTINGS.DB_NAME,
  logging: DEBUG,
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
  subscribers: [],
});
