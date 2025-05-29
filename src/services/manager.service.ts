import { roles } from "../common/middlewares/auth";
import { UnauthorizedError } from "../common/errors/UnauthorizedError";
import { IManager } from "../models/manager.model";
import { ManagerRepository } from "../repositories/manager.repository";
import { CustomerRepository } from "../repositories/customer.repository";
import { HashService } from "./hash.service";
import { TokenService } from "./token.service";

export class ManagerService {
  constructor(
    private readonly managerRepo: ManagerRepository,
    private readonly customerRepo: CustomerRepository,
    private hashService: HashService,
    private tokenService: TokenService
  ) {}

  async createManager(categoryData: IManager) {
    const hashedPassword = await this.hashService.hash(categoryData.password);
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

    const isValidPassword = await this.hashService.compare(
      pass,
      manager.password
    );

    if (!isValidPassword) {
      throw new UnauthorizedError("Invalid credential");
    }

    const token = this.tokenService.sign(
      { id: manager._id, role: roles.MANAGER },
      "1d"
    );

    return token;
  }

  async getCustomers() {
    return this.customerRepo.getCustomers();
  }
}
