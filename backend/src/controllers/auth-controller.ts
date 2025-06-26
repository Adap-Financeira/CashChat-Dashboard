import { Request, Response, Express, Router } from "express";
import { LoginSchema, RegisterPasswordSchema } from "../schemas/auth-schemas";
import { CustomError } from "../utils/errors";
import validateRequestBody from "../middleware/request-body-validator";
import { login } from "../services/auth-service";
import authValidator from "../middleware/auth-validator";

export function authController(server: Express) {
  const authRouter = Router();



  authRouter.post("/login", validateRequestBody(LoginSchema), async (req: Request, res: Response) => {
    try {
      const { email } = LoginSchema.parse(req.body);

      const response = await login(email);

      res.cookie("token", response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod", // Only over HTTPS
        sameSite: "strict", // Or 'Strict' for extra CSRF protection
        maxAge: 1000 * 60 * 15, // 15 minutes
      });

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.use("/api/auth", authRouter);
}
