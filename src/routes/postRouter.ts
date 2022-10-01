import { Router } from "express";
import passport from "passport";
import { Post } from "../entities/Post";
import { PostController } from "../controllers/postController";
import { IsString, MaxLength } from "class-validator";
import { validateRequest } from "../middlewares/validateRequest";
import { CommentController } from "../controllers/commentController";
import { Comment } from "../entities/Comment";

class CreateUpdatePostRequestSchema implements Pick<Post, "title" | "body"> {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  body: string;
}

class CreateUpdateCommentRequestSchema implements Pick<Comment, "body"> {
  @IsString()
  body: string;
}

export class PostRouter {
  readonly router = Router();
  private _controller = new PostController();
  private _commentController = new CommentController();

  constructor() {
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.get("/", this._controller.allPosts);
    this.router.get("/:postId(\\d+)", this._controller.getPost);
    this.router.get(
      "/:postId(\\d+)/comments",
      this._commentController.postComments
    );

    // Protected APIs
    this.router.use(passport.authenticate("jwt", { session: false }));

    this.router.post(
      "/",
      validateRequest(CreateUpdatePostRequestSchema),
      this._controller.createPost
    );
    this.router.put(
      "/:postId(\\d+)",
      validateRequest(CreateUpdatePostRequestSchema),
      this._controller.updatePost
    );
    this.router.delete("/:postId(\\d+)", this._controller.deletePost);
    this.router.post(
      "/:postId(\\d+)/comments",
      validateRequest(CreateUpdateCommentRequestSchema),
      this._commentController.createComment
    );
    this.router.put(
      "/:postId(\\d+)/comments/:commentId(\\d+)",
      validateRequest(CreateUpdateCommentRequestSchema),
      this._commentController.updateComment
    );
    this.router.delete(
      "/:postId(\\d+)/comments/:commentId(\\d+)",
      this._commentController.deleteComment
    );
  };
}
