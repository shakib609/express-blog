import { Express } from "express";
import { AuthRouter } from "./authRouter";
import { PostRouter } from "./postRouter";

export const registerRoutes = (app: Express) => {
  const PREFIX = "/api/v1";
  app.use(`${PREFIX}/auth`, new AuthRouter().router);
  app.use(`${PREFIX}/posts/`, new PostRouter().router);
};
