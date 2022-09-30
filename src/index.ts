import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import passport from "passport";
import "./auth/strategy";
import { registerRoutes } from "./routes";
import { AppDataSource } from "./dataSource";

async function main() {
  const app = express();

  // Initialize DB Connection
  AppDataSource.initialize()
    .then((dataSurce) => {
      dataSurce.runMigrations();
    })
    .catch(console.error);

  // Register Middlewares
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(passport.initialize());

  // Register Routes
  registerRoutes(app);

  // Server Initialization
  app.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`);
  });

  // Handle errors.
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });
}

main();
