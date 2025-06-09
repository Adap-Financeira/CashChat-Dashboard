import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { statsController } from "./controllers/stats-controller";
import { authController } from "./controllers/auth-controller";
import { hotmartController } from "./controllers/hotmart-controller";
import { transactionController } from "./controllers/transaction-controller";
import { colorsController } from "./controllers/colors-controller";
import { categoryController } from "./controllers/category-controller";

dotenv.config();
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

const dbName = process.env.NODE_ENV === "prod" ? "prod" : "test";
hotmartController(app);

mongoose
  .connect(process.env.MONGO_URI!, { dbName })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

const PORT = 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
