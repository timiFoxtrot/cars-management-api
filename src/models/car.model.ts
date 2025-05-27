import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ICar extends Document {
  _id: string;
  brand: string;
  carModel: string;
  price: number;
  available: boolean;
  category?: string;
  createdBy?: string;
  purchasedBy?: string | null;
}

const carSchema = new Schema<ICar>(
  {
    _id: { type: String, default: uuidv4 },
    brand: { type: String, required: true },
    carModel: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    category: { type: String, ref: "Category" },
    createdBy: { type: String, ref: "Manager" },
    purchasedBy: { type: String, ref: "Customer", default: null },
  },
  { timestamps: true }
);

const Car = model<ICar>("Car", carSchema);
export default Car;
