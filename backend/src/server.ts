import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { statsController } from "./controllers/stats-controller";
import { authController } from "./controllers/auth-controller";
import cookieParser from "cookie-parser";

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

const dbName = process.env.NODE_ENV === "prod" ? "prod" : "test";

mongoose
  .connect(process.env.MONGO_URI!, { dbName })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

const PORT = 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Add auth middleware to protected routes

// TEST

// const user = {
//   name: "John Doe",
//   phoneNumber: "123456789",
//   email: "john.doe@example.com",
//   password: "password123",
// };

// createUser(user);
