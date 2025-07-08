import { Request, Response, Express, Router } from "express";
import { CustomError } from "../utils/errors";
import authValidator from "../middleware/auth-validator";
import validateRequestQuery from "../middleware/request-query-validator";
import { yearSchema } from "../schemas/reports-schema";
import { getYearReportSummary } from "../services/monthly-reports-service";

export function reportsController(server: Express) {
  const reportsRouter = Router();

  reportsRouter.get(
    "/monthly-reports",
    authValidator,
    validateRequestQuery(yearSchema),
    async (req: Request, res: Response) => {
      try {
        const { year } = yearSchema.parse(req.query);

        const reports = await getYearReportSummary(req.email, year);

        res.status(200).json(reports);
      } catch (error) {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  server.use("/api/reports", reportsRouter);
}
