import { Request, Response, Express, Router } from "express";
import { CustomError } from "../utils/errors";
import { getAllColors } from "../services/colors-service";
import authValidator from "../middleware/auth-validator";

export function colorsController(server: Express) {
  const colorsRouter = Router();
  colorsRouter.use(authValidator);

  colorsRouter.get("/all", async (req: Request, res: Response) => {
    try {
      const colors = await getAllColors();

      res.status(200).json(colors);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.use("/api/colors", colorsRouter);
}
