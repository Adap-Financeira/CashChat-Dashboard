import { Request, Response, Express, Router } from "express";
import { CustomError } from "../utils/errors";
import validateRequestBody from "../middleware/request-body-validator";
import { EmailSchema, RegisterSchema } from "../schemas/auth-schemas";
import { loginDashboard, registerDashboard } from "../services/auth-service";

// Dashboard authentication controller
export function authController(server: Express) {
  const authRouter = Router();

  // This endpoint is used to create a new user in mongodb with permissions
  authRouter.post("/register", validateRequestBody(RegisterSchema), async (req: Request, res: Response) => {
    try {
      const { email, name, phoneNumber, password } = RegisterSchema.parse(req.body);

      await registerDashboard({ email, name, phoneNumber, password });

      res.status(200).json({ message: "Usuário criado com sucesso." });
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }

      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Depracated
  // With the creation of 7 days free trial, the user will be linked to the firebase user during
  // the registration process.
  // This endpoint is used to link a firebase id to a user in mongodb with email
  // authRouter.post("/link-account", authValidator, async (req: Request, res: Response) => {
  //   try {
  //     const email = req.email;

  //     const updatedUser = await update(email, { firebaseId: req.firebaseId });

  //     res.status(200).json({ message: "Conta dashboard vinculada com sucesso.", updatedUser });
  //   } catch (error) {
  //     if (error instanceof CustomError) {
  //       res.status(error.statusCode).json({ error: error.message });
  //       return;
  //     }

  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // });

  // This endpoint is used to check if a user has permission to access the dashboard
  // If yes, the frontend will log the user in with firebase
  authRouter.post(
    "/login-dashboard",
    validateRequestBody(EmailSchema),
    async (req: Request, res: Response) => {
      try {
        const email = req.body.email;

        await loginDashboard(email);

        res.status(200).json({ message: "Usuário com permissão para autenticar no dashboard." });
      } catch (error) {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  server.use("/api/auth", authRouter);
}
