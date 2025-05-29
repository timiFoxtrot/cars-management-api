import { ICategory } from "../models/category.model";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(categoryData: ICategory) {
    return await this.categoryRepository.create(categoryData);
  }

  async getCategory(id: string) {
    return await this.categoryRepository.findById(id);
  }

  async getAllCategories() {
    return await this.categoryRepository.findAll();
  }

  async updateCategory(id: string, updateData: Partial<ICategory>) {
    return await this.categoryRepository.update(id, updateData);
  }

  async deleteCategory(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
