import { config } from "../common/config";
import { roles } from "../common/middlewares/auth";
import { UnauthorizedError } from "../common/errors/UnauthorizedError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomerRepository } from "../repositories/customer.repository";
import { ICustomer } from "../models/customer.model";

export class CustomerService {
  constructor(
    private readonly customerRepo: CustomerRepository,
  ) {}

  async createCustomer(categoryData: ICustomer) {
    const hashedPassword = await bcrypt.hash(categoryData.password, 10);
    const result = await this.customerRepo.createCustomer({
      ...categoryData,
      password: hashedPassword,
    });

    return result;
  }

  async login(email: string, pass: string) {
    const customer = await this.customerRepo.findByEmail(email);

    if (!customer) {
      throw new UnauthorizedError("Invalid credential");
    }

    const isValidPassword = await bcrypt.compare(pass, customer.password);

    if (!isValidPassword) {
      throw new UnauthorizedError("Invalid credential");
    }

    const token = jwt.sign(
      { id: customer._id, role: roles.CUSTOMER },
      config.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return token;
  }
}
