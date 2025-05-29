import { config } from "../common/config";
import { roles } from "../common/middlewares/auth";
import { UnauthorizedError } from "../common/errors/UnauthorizedError";
import { IManager } from "../models/manager.model";
import { ManagerRepository } from "../repositories/manager.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomerRepository } from "../repositories/customer.repository";

export class ManagerService {
  constructor(private readonly managerRepo: ManagerRepository, 
    private readonly customerRepo: CustomerRepository) {}

  async createManager(categoryData: IManager) {
    const hashedPassword = await bcrypt.hash(categoryData.password, 10);
    const result = await this.managerRepo.createManager({
      ...categoryData,
      password: hashedPassword,
    });

    return result;
  }

  async login(email: string, pass: string) {
    const manager = await this.managerRepo.findByEmail(email);

    if (!manager) {
      throw new UnauthorizedError("Invalid credential");
    }

    const isValidPassword = await bcrypt.compare(pass, manager.password);

    if (!isValidPassword) {
      throw new UnauthorizedError("Invalid credential");
    }

    const token = jwt.sign(
      { id: manager._id, role: roles.MANAGER },
      config.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return token;
  }

  async getCustomers() {
    return this.customerRepo.getCustomers()
  }
}
