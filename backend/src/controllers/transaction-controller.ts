import { Request, Response, Express, Router } from "express";
import authValidator from "../middleware/auth-validator";
import {
  createTransaction,
  createTransactionInstallments,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
} from "../services/transaction-services";
import { CustomError } from "../utils/errors";
import { dateSchema } from "../schemas/date-schemas";
import { getEndOfMonth, getStartOfMonth, transformDateToUsLocale } from "../utils/date";
import {
  createTransactionSchema,
  removeTransactionSchema,
  updateTransactionSchema,
} from "../schemas/transaction-schemas";
import validateRequestBody from "../middleware/request-body-validator";
import { getPaymentMethodById } from "../services/payment-methods-service";
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
      const from = transformDateToUsLocale(parsedDate.data.from);
      const to = transformDateToUsLocale(parsedDate.data.to);

      const now = new Date();
      const startDate = from ? new Date(from) : getStartOfMonth(now);
      const endDate = to ? new Date(to) : getEndOfMonth(now);

      const transactions = await getAllTransactions(req.email, startDate, endDate);

      res.status(200).json(transactions);
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  });

  transactionRouter.post(
    "/create",
    authValidator,
    validateRequestBody(createTransactionSchema),
    async (req: Request, res: Response) => {
      try {
        const data = createTransactionSchema.parse(req.body);

        // Get the payment method by id and check if it is a credit
        const paymentMethod = await getPaymentMethodById(data.paymentMethodId);

        if (paymentMethod.type === "credit") {
          await createTransactionInstallments(req.email, data);
        } else {
          await createTransaction(req.email, data);
        }

        res.status(201).json({ message: "Transação criada com sucesso." });
      } catch (error) {
        console.log(error);

        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  transactionRouter.put(
    "/update",
    authValidator,
    validateRequestBody(updateTransactionSchema),
    async (req: Request, res: Response) => {
      try {
        const data = updateTransactionSchema.parse(req.body);
        await updateTransaction(req.email, data);
        res.status(200).json({ message: "Transação atualizada com sucesso." });
      } catch (error) {
        console.log(error);
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  transactionRouter.delete(
    "/delete",
    authValidator,
    validateRequestBody(removeTransactionSchema),
    async (req: Request, res: Response) => {
      try {
        const data = removeTransactionSchema.parse(req.body);
        await deleteTransaction(req.email, data.transactionId);
        res.status(200).json({ message: "Transação removida com sucesso." });
      } catch (error) {
        console.log(error);
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  server.use("/api/transaction", authValidator, transactionRouter);
}
