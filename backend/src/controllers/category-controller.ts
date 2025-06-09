import { Request, Response, Express, Router } from "express";
import { CustomError } from "../utils/errors";
import authValidator from "../middleware/auth-validator";
import validateRequestBody from "../middleware/request-body-validator";
import {
  createCategoryWithEmail,
  getAllCategories,
  removeCategory,
  updateCategory,
} from "../services/category-services";
import {
  createCategorySchema,
  removeCategorySchema,
  updateCategorySchema,
} from "../schemas/categories-schema";
import validatePermission from "../middleware/check-permission";

// TODO:
// - Implement category controller [x]
// - Implement category service [x]
// - Implement category repository [x]
// - Implement category model [x]
// - Implement create, update, delete and get category endpoints [x]
// - Check if user has permission to create categories [x]

// Category controller
export function categoryController(server: Express) {
  const categoryRouter = Router();
  categoryRouter.use(authValidator);

  categoryRouter.get("/all", async (req: Request, res: Response) => {
    try {
      const categories = await getAllCategories(req.email);

      res.status(200).json(categories);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  });

  categoryRouter.post(
    "/create",
    validateRequestBody(createCategorySchema),
    validatePermission("categories"),
    async (req: Request, res: Response) => {
      try {
        console.log("here?");

        await createCategoryWithEmail(req.body, req.email);

        res.status(200).json({ message: "Categoria criada com sucesso." });
      } catch (error) {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  categoryRouter.put(
    "/update",
    validateRequestBody(updateCategorySchema),
    validatePermission("categories"),
    async (req: Request, res: Response) => {
      try {
        await updateCategory(req.body);

        res.status(200).json({ message: "Categoria atualizada com sucesso." });
      } catch (error) {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  categoryRouter.delete(
    "/delete",
    validateRequestBody(removeCategorySchema),
    validatePermission("categories"),
    async (req: Request, res: Response) => {
      try {
        const categoryId: string = req.body.categoryId;

        await removeCategory({ categoryId });

        res.status(200).json({ message: "Categoria removida com sucesso." });
      } catch (error) {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }

        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  server.use("/api/categories", categoryRouter);
}
