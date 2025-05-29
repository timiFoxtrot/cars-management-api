import { ConflictError } from "../common/errors/ConflictError";
import Customer, { ICustomer } from "../models/customer.model";

export class CustomerRepository {
  async createCustomer(customerData: ICustomer) {
    const existingCustomer = await Customer.findOne({
      email: customerData.email.toLowerCase(),
    });

    if (existingCustomer) throw new ConflictError("Email already taken");

    const newCustomer = new Customer({
      ...customerData,
      email: customerData.email.toLowerCase(),
    });
    const savedCustomer = await newCustomer.save();

    const customerObj = savedCustomer.toObject();
    const { password, ...customerWithoutPassword } = customerObj;
    return customerWithoutPassword;
  }

  async findByEmail(email: string) {
    return Customer.findOne({ email });
  }

  async getCustomers() {
    const customers = await Customer.find().select("-password");
    return customers.map((customer) => customer.toObject());
  }
}
