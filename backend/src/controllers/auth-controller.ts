import { Request, Response, Express, Router } from "express";
import { CustomError } from "../utils/errors";
import authValidator from "../middleware/auth-validator";
import { findUserByEmail, update } from "../services/user-service";
import { findPermissionByUserIdAndProductId } from "../services/permission-services";
import validateRequestBody from "../middleware/request-body-validator";
import { EmailSchema } from "../schemas/auth-schemas";

// Dashboard authentication controller
export function authController(server: Express) {
  const authRouter = Router();

  authRouter.post("/check-email", validateRequestBody(EmailSchema), async (req: Request, res: Response) => {
    try {
      const email = req.body.email;

      const user = await findUserByEmail(email);

      // Check if the user exists in mongodb
      if (!user) {
        throw new CustomError("Este email não tem permissão para criar conta.", 401);
      }

      // Check if user already has a firebase id
      if (user.firebaseId) {
        throw new CustomError("Este email já tem uma conta dashboard vinculada.", 400);
      }

      res.status(200).json({ message: "Email válido", isValid: true });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  });

  // This endpoint is used to set firebase id to a user in mongodb with email
  authRouter.post("/link-account", authValidator, async (req: Request, res: Response) => {
    try {
      const email = req.email;

      // Check if the user exists in mongodb
      const user = await findUserByEmail(email);

      // Check if user is not null
      if (!user) {
        throw new CustomError("Este email não tem permissão para criar conta.", 401);
      }

      // Check if this user has permission to access the dashboard
      // Using userId and dashboard product id to find permission
      const userPermission = await findPermissionByUserIdAndProductId(user._id.toString(), "dashboard");
      if (!userPermission?.access) {
        throw new CustomError("Este email não tem permissão para criar conta no dashboard.", 401);
      }

      // Check if this permission in expired
      if (userPermission.expiresAt && userPermission.expiresAt < new Date()) {
        throw new CustomError("A permissão para acessar o dashboard expirou.", 401);
      }

      const updatedUser = await update(email, { firebaseId: req.firebaseId });

      res.status(200).json({ message: "Conta dashboard vinculada com sucesso.", updatedUser });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  });

  authRouter.post(
    "/login-dashboard",
    validateRequestBody(EmailSchema),
    async (req: Request, res: Response) => {
      try {
        const email = req.body.email;

        const user = await findUserByEmail(email);

        // Check if user already has a firebase id
        if (!user.firebaseId) {
          throw new CustomError("Este email não tem uma conta dashboard vinculada.", 401);
        }

        // Check if permissions are valid
        const userPermission = await findPermissionByUserIdAndProductId(user._id.toString(), "dashboard");

        if (!userPermission?.access) {
          throw new CustomError("Este email não tem permissão para acessar o dashboard.", 401);
        }

        // Check if this permission in expired
        if (userPermission.expiresAt && userPermission.expiresAt < new Date()) {
          throw new CustomError("Sua permissão de acesso ao dashboard expirou.", 401);
        }

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
