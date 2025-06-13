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
import { remindersController } from "./controllers/reminders-controller";

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
remindersController(app);

const dbName = process.env.NODE_ENV === "prod" ? "prod" : "test";
hotmartController(app);

mongoose
  .connect(process.env.MONGO_URI!, { dbName })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

const PORT = 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// --- Reminders ---
// Add status to reminders to know if it was sent for ther user or not.
// Check if is a good idea to add another parameters in reminders to notify the user when he wants
// the main idea is to have the date param to the date of event and some notifyAt param to help
// the server know when to notify the user.

// --- Categories ---
// Check if some category have transactions before update it.
// If yes, update all category name in that transactions. If not, just update it.
// Check if some category have transactions before delete it.
// If yes, update all category name in that transactions. If not, just delete it.

// --- User ---
// Think about some way to have linked accounts for multiple users.
