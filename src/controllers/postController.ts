import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { Post } from "../entities/Post";

export class PostController {
  private repository = AppDataSource.getRepository(Post);

  allPosts = async (_req: Request, res: Response, _next: NextFunction) => {
    const posts = await this.repository.find({
      relations: {
        author: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
    res.json(posts);
  };

  getPost = async (req: Request, res: Response, _next: NextFunction) => {
    const postId = Number(req.params.postId);
    const post = await this.repository.findOne({
      relations: { author: true },
      where: { id: postId },
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  };

  userPosts = async (req: Request, res: Response, _next: NextFunction) => {
    const { username } = req.params;
    const posts = await this.repository.findBy({ author: { username } });
    res.json(posts);
  };

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    try {
      const post = this.repository.create({
        ...payload,
        author: { id: req.user?.id },
      });
      const createdPost = await this.repository.save(post);
      res.json(createdPost);
    } catch (e) {
      next(e);
    }
  };

  updatePost = async (req: Request, res: Response, _next: NextFunction) => {
    const postId = Number(req.params.postId);
    const payload = req.body;
    const post = await this.repository.findOne({
      relations: { author: true },
      where: { id: postId, author: { id: req.user?.id } },
    });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      post.title = payload.title;
      post.body = payload.body;
      const updatedPost = await this.repository.save(post);
      res.json(updatedPost);
    }
  };

  deletePost = async (req: Request, res: Response, _next: NextFunction) => {
    const postId = Number(req.params.postId);
    await this.repository.delete({ id: postId, author: { id: req.user?.id } });
    res.status(200).json({ message: "Post deleted successfully" });
  };
}
