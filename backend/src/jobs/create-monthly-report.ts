import cron from "node-cron";
import { createMonthlyReportsForAllUsers } from "../services/monthly-reports-service";

// Runs at 00:00 on the 1st day of every month

export function createMonthlyReportJob() {
  cron.schedule("0 0 1 * *", async () => {
    try {
      const now = new Date();
      const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

      console.log("Creating monthly report for last month:", lastMonth + 1, "and year:", year);
      await createMonthlyReportsForAllUsers(lastMonth + 1, year); // +1 if your service expects 1-based month
    } catch (error) {
      console.log("Error creating monthly report:");
      console.log(error);
    }
  });
}
