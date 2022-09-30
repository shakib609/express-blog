import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/User";
import { validateRequest } from "../middlewares/validateRequest";
import passport from "passport";

class LoginRequestSchema implements Pick<User, "username" | "password"> {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

class RegisterRequestSchema
  implements Pick<User, "username" | "password" | "email">
{
  @IsString()
  @MinLength(4)
  @MaxLength(128)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @IsEmail()
  email: string;
}

export class AuthRouter {
  readonly router = Router();
  private _controller = new AuthController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      "/login",
      validateRequest(LoginRequestSchema),
      this._controller.login
    );

    this.router.post(
      "/register",
      validateRequest(RegisterRequestSchema),
      this._controller.register
    );

    this.router.get(
      "/me",
      passport.authenticate("jwt", { session: false }),
      this._controller.me
    );
  }
}
