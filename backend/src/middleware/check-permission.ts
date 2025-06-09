import { Request, Response, NextFunction } from "express";
import { checkUserPermission } from "../services/permission-services";
import { CustomError } from "../utils/errors";

export default function validatePermission(productId: string) {
  return async function requestBodyValidator(request: Request, response: Response, next: NextFunction) {
    try {
      // Check if user has permission
      const permission = await checkUserPermission(request.email, productId);
      console.log(permission);

      next();
    } catch (error: any) {
      console.log(error);
      if (error instanceof CustomError) {
        response.status(error.statusCode).json({ error: error.message });
        return;
      }

      response.status(500).send("Internal server error");
    }
  };
}
