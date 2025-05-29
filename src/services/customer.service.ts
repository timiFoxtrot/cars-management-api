import { roles } from "../common/middlewares/auth";
import { UnauthorizedError } from "../common/errors/UnauthorizedError";
import { CustomerRepository } from "../repositories/customer.repository";
import { ICustomer } from "../models/customer.model";
import { HashService } from "./hash.service";
import { TokenService } from "./token.service";

export class CustomerService {
  constructor(
    private readonly customerRepo: CustomerRepository,
    private hashService: HashService,
    private tokenService: TokenService
  ) {}

  async createCustomer(categoryData: ICustomer) {
    const hashedPassword = await this.hashService.hash(categoryData.password);
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

    const isValidPassword = await this.hashService.compare(
      pass,
      customer.password
    );

    if (!isValidPassword) {
      throw new UnauthorizedError("Invalid credential");
    }

    const token = this.tokenService.sign(
      { id: customer._id, role: roles.CUSTOMER },
      "1d"
    );

    return token;
  }
}
