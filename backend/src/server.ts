import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { statsController } from "./controllers/stats-controller";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

statsController(app);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

const PORT = 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
