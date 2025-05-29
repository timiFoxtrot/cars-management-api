import { ConflictError } from "../common/errors/ConflictError";
import Category, { ICategory } from "../models/category.model";

export class CategoryRepository {
  async create(categoryData: ICategory) {
    const existingCategory = await Category.findOne({
      name: categoryData.name,
    });
    if (existingCategory) throw new ConflictError("Category already exists");
    const category = new Category(categoryData);
    return await category.save();
  }

  async findById(id: string) {
    return await Category.findById(id);
  }

  async findAll() {
    return await Category.find();
  }

  async update(id: string, updateData: Partial<ICategory>) {
    return await Category.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string) {
    return await Category.findByIdAndDelete(id);
  }
}
