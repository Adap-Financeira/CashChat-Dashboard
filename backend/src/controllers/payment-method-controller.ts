import { Request, Response, Express, Router } from "express";
import { CustomError } from "../utils/errors";
import authValidator from "../middleware/auth-validator";
import { getPaymentMethods } from "../services/payment-methods-service";

// Payment method controller
export function paymentMethodController(server: Express) {
  const paymentMethodRouter = Router();
  paymentMethodRouter.use(authValidator);

  paymentMethodRouter.get("/all", async (req: Request, res: Response) => {
    try {
      const paymentMethods = await getPaymentMethods();

      res.status(200).json(paymentMethods);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.use("/api/payment-methods", paymentMethodRouter);
}
