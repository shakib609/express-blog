import { Router } from "express";
import passport from "passport";
import { Post } from "../entities/Post";
import { PostController } from "../controllers/postController";
import { IsString, MaxLength } from "class-validator";
import { validateRequest } from "../middlewares/validateRequest";

class CreateUpdatePostRequestSchema implements Pick<Post, "title" | "body"> {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  body: string;
}

export class PostRouter {
  readonly router = Router();
  private _controller = new PostController();

  constructor() {
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.get("/", this._controller.allPosts);
    this.router.get("/:id", this._controller.getPost);
    // Protected APIs
    this.router.use(passport.authenticate("jwt", { session: false }));
    this.router.post(
      "/",
      validateRequest(CreateUpdatePostRequestSchema),
      this._controller.createPost
    );
    this.router.put(
      "/:id",
      validateRequest(CreateUpdatePostRequestSchema),
      this._controller.updatePost
    );
    this.router.delete("/:id", this._controller.deletePost);
  };
}
