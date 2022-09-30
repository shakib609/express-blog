import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/User";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

export class AuthController {
  private repository = AppDataSource.getRepository(User);

  private _userResponse = (user: User) => {
    const { username, id, email, createdAt, updatedAt } = user;
    return { username, id, email, createdAt, updatedAt };
  };

  register = async (req: Request, res: Response, _next: NextFunction) => {
    const payload = {
      username: req.body.username,
      password: await argon2.hash(req.body.password),
      email: req.body.email,
    };
    const user = this.repository.create(payload);
    await this.repository.save(user);
    res.status(201).json(this._userResponse(user));
  };

  login = async (req: Request, res: Response, _next: NextFunction) => {
    const payload = {
      username: req.body.username,
      password: req.body.password,
    };
    const user = await this.repository.findOne({
      where: {
        username: payload.username,
      },
      select: {
        password: true,
      },
    });
    if (!user) {
      res.status(401).json({ errors: [{ message: "Invalid credentials" }] });
      return;
    }
    const validPassword = await argon2.verify(user.password, payload.password);
    if (!validPassword) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET
      );
      res.json({ token });
    }
  };

  me = async (req: Request, res: Response, _next: NextFunction) => {
    res.json(this._userResponse(req.user as User));
  };
}
