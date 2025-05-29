import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ICustomer  {
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

const Customer = model<ICustomer>("User", customerSchema);
export default Customer;
// // Hash password before saving user
// customerSchema.pre("save", async function (next) {
//   const customer = this as ICustomer;
//   if (!customer.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   customer.password = await bcrypt.hash(customer.password, salt);
//   next();
// });

