import { Request, Response, Express, Router } from "express";
import { CustomError } from "../utils/errors";
import authValidator from "../middleware/auth-validator";
import validateRequestBody from "../middleware/request-body-validator";
import {
  createReminder,
  getAllRemindersByUser,
  getSomeRemindersByUser,
  removeReminder,
  updateReminder,
} from "../services/reminders-services";
import {
  createReminderSchema,
  getSomeRemindersSchema,
  removeReminderSchema,
  updateReminderSchema,
} from "../schemas/reminders-schema";
import validateRequestQuery from "../middleware/request-query-validator";

export function remindersController(server: Express) {
  const remindersRouter = Router();
  remindersRouter.use(authValidator);

  remindersRouter.get(
    "/all",
    validateRequestQuery(getSomeRemindersSchema),
    async (req: Request, res: Response) => {
      try {
        const limit = req.query.limit as string;

        if (limit) {
          const reminders = await getSomeRemindersByUser(req.email, Number(limit));
          res.status(200).json(reminders);
          return;
        }

        const reminders = await getAllRemindersByUser(req.email);
        res.status(200).json(reminders);
      } catch (error) {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  remindersRouter.post(
    "/create",
    validateRequestBody(createReminderSchema),
    async (req: Request, res: Response) => {
      try {
        await createReminder(req.email, req.body.description, req.body.date);

        res.status(200).json({ message: "Lembrete criado com sucesso." });
      } catch (error) {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  remindersRouter.put(
    "/update",
    validateRequestBody(updateReminderSchema),
    async (req: Request, res: Response) => {
      try {
        await updateReminder(req.body.reminderId, req.body.description, req.body.date);

        res.status(200).json({ message: "Lembrete atualizado com sucesso." });
      } catch (error) {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  remindersRouter.delete(
    "/delete",
    validateRequestBody(removeReminderSchema),
    async (req: Request, res: Response) => {
      try {
        const reminderId: string = req.body.reminderId;

        await removeReminder(reminderId);

        res.status(200).json({ message: "Lembrete removido com sucesso." });
      } catch (error) {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  server.use("/api/reminders", remindersRouter);
}
