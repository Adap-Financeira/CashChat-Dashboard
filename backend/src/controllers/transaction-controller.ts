import { Request, Response, Express, Router } from "express";
import authValidator from "../middleware/auth-validator";
import { getAllTransactions } from "../services/transaction-services";
import { CustomError } from "../utils/errors";
import { dateSchema } from "../schemas/date-schemas";
import { getEndOfMonth, getStartOfMonth, transformDateToUsLocale } from "../utils/date";
export function transactionController(server: Express) {
  const transactionRouter = Router();

  transactionRouter.get("/all", authValidator, async (req: Request, res: Response) => {
    try {
      const date = req.query;
      const parsedDate = dateSchema.safeParse(date);

      if (!parsedDate.success) {
        throw new CustomError("Invalid date format", 400);
      }

      // Transform dd/MM/yyyy to MM/dd/yyyy
      parsedDate.data.from = transformDateToUsLocale(parsedDate.data.from);
      parsedDate.data.to = transformDateToUsLocale(parsedDate.data.to);

      const now = new Date();
      const startDate = parsedDate.data?.from ? new Date(parsedDate.data.from) : getStartOfMonth(now);
      const endDate = parsedDate.data?.to ? new Date(parsedDate.data.to) : getEndOfMonth(now);

      const transactions = await getAllTransactions(startDate, endDate);

      res.status(200).json(transactions);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.use("/api/transaction", authValidator, transactionRouter);
}
