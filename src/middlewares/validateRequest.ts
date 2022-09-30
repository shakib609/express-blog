import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateRequest = (RequestSchema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const requestPayload = new RequestSchema();
    Object.keys(req.body).map((k) => {
      requestPayload[k] = req.body[k];
    });
    const errors = await validate(requestPayload, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      res.status(400).json({ errors });
    } else {
      next();
    }
  };
};
