import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IManager {
  name: string;
  email: string;
  password: string;
}

const managerSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Manager = model<IManager>("Manager", managerSchema);
export default Manager;
