import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ICategory {
  name: string;
}

const categorySchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = model<ICategory>("Category", categorySchema);
export default Category;
