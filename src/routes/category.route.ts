import { Router } from "express";
import { createCategorySchema } from "../common/validators";
import { CategoryRepository } from "../repositories/category.repository";
import { CategoryService } from "../services/category.service";
import { CategoryController } from "../controllers/category.controller";
import { authenticate, authorize, roles } from "../common/middlewares/auth";

export const categoryRouter = Router();

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

categoryRouter.post(
  "/",
  authenticate(),
  authorize([roles.MANAGER]),
  createCategorySchema,
  categoryController.createCategory
);
categoryRouter.get(
  "/",
  authenticate(),
  authorize([roles.MANAGER]),
  categoryController.getCategories
);
categoryRouter.get("/:id", categoryController.getCategory);
categoryRouter.patch(
  "/:id",
  authenticate(),
  authorize([roles.MANAGER]),
  categoryController.updateCategory
);
categoryRouter.delete(
  "/:id",
  authenticate(),
  authorize([roles.MANAGER]),
  categoryController.deleteCategory
);
