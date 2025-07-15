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

      // Return the first validation error message
      response
        .status(400)
        .json({ error: Object.values(error.flatten().fieldErrors as Record<string, string[]>)[0][0] });
    }
  };
}
