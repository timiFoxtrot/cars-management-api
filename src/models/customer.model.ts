import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const customerSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Customer = model<ICustomer>("Customer", customerSchema);
export default Customer;
