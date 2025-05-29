import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
// import logger from "../utils/logger.utilities";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  createCategory = async (req: Request, res: Response) => {
    try {
      const result = await this.categoryService.createCategory(req.body);
      res.status(201).json({
        status: "success",
        message: "Category added successfully",
        data: result,
      });
    } catch (error: any) {
      //   logger.error(`ERROR CREATING CATEGORY: ${error.message}`);
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  getCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await this.categoryService.getCategory(id);
      if (!category) {
        res
          .status(404)
          .json({ status: "error", message: "Category not found" });
      } else {
        res.json({
          status: "success",
          message: "Category fetched successfully",
          data: category,
        });
      }
    } catch (error: any) {
      //   logger.error(`ERROR RETRIEVING CATEGORY: ${error.message}`);
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.json({
        status: "success",
        message: "Categories fetched successfully",
        data: categories,
      });
    } catch (error: any) {
      //   logger.error(`ERROR RETRIEVING CATEGORIES: ${error.message}`);
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedCategory = await this.categoryService.updateCategory(
        id,
        req.body
      );
      if (!updatedCategory) {
        res
          .status(404)
          .json({ status: "error", message: "Category not found" });
      } else {
        res.json({
          status: "success",
          message: "Category updated successfully",
          data: updatedCategory,
        });
      }
    } catch (error: any) {
      //   logger.error(`ERROR UPDATING CATEGORY: ${error.message}`);
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedCategory = await this.categoryService.deleteCategory(id);
      if (!deletedCategory) {
        res
          .status(404)
          .json({ status: "error", message: "Category not found" });
      } else {
        res.json({
          status: "success",
          message: "Category deleted successfully",
          data: deletedCategory,
        });
      }
    } catch (error: any) {
      //   logger.error(`ERROR DELETING CATEGORY: ${error.message}`);
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message,
      });
    }
  };
}
