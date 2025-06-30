import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./models/PaymentMethods"; // Import the PaymentMethods model to register it with Mongoose
import { statsController } from "./controllers/stats-controller";
import { authController } from "./controllers/auth-controller";
import { hotmartController } from "./controllers/hotmart-controller";
import { transactionController } from "./controllers/transaction-controller";
import { colorsController } from "./controllers/colors-controller";
import { categoryController } from "./controllers/category-controller";
import { remindersController } from "./controllers/reminders-controller";
import { paymentMethodController } from "./controllers/payment-method-controller";
import { createMonthlyReportJob } from "./jobs/create-monthly-report";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

authController(app);
statsController(app);
transactionController(app);
colorsController(app);
categoryController(app);
remindersController(app);
paymentMethodController(app);

const dbName = process.env.NODE_ENV === "prod" ? "prod" : "test";
hotmartController(app);

mongoose
  .connect(process.env.MONGO_URI!, { dbName })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

// Jobs
// createMonthlyReportJob();

const PORT = process.env.PORT ||5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
