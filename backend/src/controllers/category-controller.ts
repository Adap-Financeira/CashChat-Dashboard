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

// Category controller
export function categoryController(server: Express) {
  const categoryRouter = Router();
  categoryRouter.use(authValidator);

  // Get user categories
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

  // Create category
  categoryRouter.post(
    "/create",
    validateRequestBody(createCategorySchema),
    validatePermission("categories"),
    async (req: Request, res: Response) => {
      try {
        await createCategoryWithEmail(req.email, req.body);

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

  // Update category
  categoryRouter.put(
    "/update",
    validateRequestBody(updateCategorySchema),
    validatePermission("categories"),
    async (req: Request, res: Response) => {
      try {
        await updateCategory(req.email, req.body);

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

  // Delete category
  categoryRouter.delete(
    "/delete",
    validateRequestBody(removeCategorySchema),
    validatePermission("categories"),
    async (req: Request, res: Response) => {
      try {
        const categoryId: string = req.body.categoryId;

        await removeCategory(req.email, { categoryId });

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

  // Check user permission to make crud operations on categories
  // This is used to hide the button to create categories if the user doesn't have permission
  categoryRouter.get("/permission", validatePermission("categories"), async (req: Request, res: Response) => {
    try {
      const permission = true;

      res.status(200).json(permission);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.use("/api/categories", categoryRouter);
}
