import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { statsController } from "./controllers/stats-controller";
import { authController } from "./controllers/auth-controller";
import cookieParser from "cookie-parser";
import { PermissionDto } from "./dto/permission";
import { createPermission } from "./services/permission-services";
// import { createUser } from "./services/user-service";
// import { IUser } from "./types/User";
// import { CreateUserDto } from "./dto/user";
import { hotmartController } from "./controllers/hotmart-controller";

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
hotmartController(app);

mongoose
  .connect(process.env.MONGO_URI!, { dbName })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

const PORT = 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Add auth middleware to protected routes

// TEST

// const user: CreateUserDto = {
//   name: "Guilherme",
//   phoneNumber: "5512997395911",
//   email: "guilherme@gmail.com",
//   password: "123456",
// };

// createUser(user);

// const permission: PermissionDto = {
//   userId: "682f980f6af618322bc32b89",
//   productId: "1111111",
//   phoneNumber: "5512997395911",
//   access: false,
//   expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), //1year from now,
// };

// createPermission(permission);
