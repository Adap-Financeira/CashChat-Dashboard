import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types/User";

declare module "express-serve-static-core" {
  interface Request {
    userId: string;
  }
}

export default async function authValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const cookieToken = req.cookies.token;

    if (!cookieToken) {
      res.status(401).json({
        error: "Autenticação necessária.",
      });
      return;
    }

    const user_token = jwt.verify(cookieToken, process.env.JWT_SECRET!) as {
      user: IUser;
      iat: number;
      exp: number;
    };

    req.userId = user_token.user._id as string;

    next();
  } catch (error) {
    res.status(401).send({
      message: "Token inválido ou expirado.",
    });
    return;
  }
}
