import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export default function validateRequestBody(schema: ZodSchema) {
  return function requestBodyValidator(request: Request, response: Response, next: NextFunction) {
    try {
      schema.parse(request.body);

      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.log(error.flatten().fieldErrors);
      }
      response.status(400).json({ error: "Informe os campos obrigatórios corretamente." });
    }
  };
}
