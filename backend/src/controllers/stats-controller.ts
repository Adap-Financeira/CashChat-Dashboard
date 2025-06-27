import { getUserStats } from "../services/stats-services";
import { Request, Response, Express, Router } from "express";
import { CustomError } from "../utils/errors";

export function statsController(server: Express) {
  const statsRouter = Router();

  statsRouter.get("/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const stats = await getUserStats(userId);

      res.status(200).json(stats);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.use("/api/stats", statsRouter);
}
