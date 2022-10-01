import { NextFunction, Request, Response } from "express";
import { DeepPartial } from "typeorm";
import { AppDataSource } from "../dataSource";
import { Comment } from "../entities/Comment";

export class CommentController {
  private repository = AppDataSource.getRepository(Comment);

  postComments = async (req: Request, res: Response, _next: NextFunction) => {
    const postId = Number(req.params.postId);
    const comments = await this.repository.find({
      where: { post: { id: postId } },
      relations: {
        author: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
    res.json(comments);
  };

  createComment = async (req: Request, res: Response, _next: NextFunction) => {
    const postId = Number(req.params.postId);
    const payload = {
      ...req.body,
      post: { id: postId },
      author: { id: req.user?.id },
    } as DeepPartial<Comment>;
    const comment = this.repository.create(payload);
    const createdComment = await this.repository.save(comment);
    res.status(201).json(createdComment);
  };

  deleteComment = async (req: Request, res: Response, _next: NextFunction) => {
    const commentId = Number(req.params.commentId);
    await this.repository.delete({
      id: commentId,
      author: { id: req.user?.id },
    });
    res.status(200).json({ message: "Comment deleted successfully" });
  };

  updateComment = async (req: Request, res: Response, _next: NextFunction) => {
    const commentId = Number(req.params.commentId);
    const comment = await this.repository.findOne({
      where: { id: commentId, author: { id: req.user?.id } },
    });
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    comment.body = req.body.body;
    const updatedComment = await this.repository.save(comment);
    res.json(updatedComment);
  };
}
