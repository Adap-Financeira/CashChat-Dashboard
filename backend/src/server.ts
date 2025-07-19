import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./models/PaymentMethods"; // Import the PaymentMethods model to register it with Mongoose
import { authController } from "./controllers/auth-controller";
import { hotmartController } from "./controllers/hotmart-controller";
import { transactionController } from "./controllers/transaction-controller";
import { colorsController } from "./controllers/colors-controller";
import { categoryController } from "./controllers/category-controller";
import { remindersController } from "./controllers/reminders-controller";
import { paymentMethodController } from "./controllers/payment-method-controller";
import { createMonthlyReportJob } from "./jobs/create-monthly-report";
import { reportsController } from "./controllers/reports-controller";
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

authController(app);
transactionController(app);
colorsController(app);
categoryController(app);
remindersController(app);
paymentMethodController(app);
hotmartController(app);
reportsController(app);

const dbName = process.env.NODE_ENV === "prod" ? "prod" : "test";

mongoose
  .connect(process.env.MONGO_URI!, { dbName })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

app.listen(process.env.PORT || 5001, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT || 5001}`)
);

// Jobs
createMonthlyReportJob();
