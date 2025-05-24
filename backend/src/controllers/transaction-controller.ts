import { Request, Response, Express, Router } from "express";
import authValidator from "../middleware/auth-validator";
import { getAllTransactions } from "../services/transaction-services";
import { CustomError } from "../utils/errors";
export function transactionController(server: Express) {
  const transactionRouter = Router();

  transactionRouter.get("/all", async (req: Request, res: Response) => {
    try {
      const transactions = await getAllTransactions();

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
