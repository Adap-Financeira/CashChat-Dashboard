import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export default function validateRequestQuery(schema: ZodSchema) {
  return function requestQueryValidator(request: Request, response: Response, next: NextFunction) {
    try {
      schema.parse(request.query);

      next();
    } catch (error: any) {
      response.status(400).send("Parâmetros inválidos.");
    }
  };
}
