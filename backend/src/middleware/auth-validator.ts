import { NextFunction, Request, Response } from "express";
import admin from "../lib/firebase-admin";

declare module "express-serve-static-core" {
  interface Request {
    firebaseId: string;
    email: string;
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

    const decodedToken = await admin.auth().verifyIdToken(cookieToken);

    // const user_token = jwt.verify(cookieToken, process.env.JWT_SECRET!) as {
    //   _id: string;
    //   name: string;
    //   email: string;
    //   phoneNumber: string;
    //   iat: number;
    //   exp: number;
    // };

    req.firebaseId = decodedToken.uid;
    req.email = decodedToken.email!;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Token inválido ou expirado.",
    });
    return;
  }
}
