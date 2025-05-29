import { Router } from "express";
import { createUserSchema, loginSchema } from "../common/validators";
import { CustomerRepository } from "../repositories/customer.repository";
import { CustomerService } from "../services/customer.service";
import { CustomerController } from "../controllers/customer.controller";
import { HashService } from "../services/hash.service";
import { TokenService } from "../services/token.service";

export const customerRouter = Router();

const customerRepository = new CustomerRepository();
const hashService = new HashService();
const tokenService = new TokenService();
const customerService = new CustomerService(
  customerRepository,
  hashService,
  tokenService
);
const customerController = new CustomerController(customerService);

customerRouter.post(
  "/register",
  createUserSchema,
  customerController.registerCustomer
);

customerRouter.post("/login", loginSchema, customerController.loginCustomer);
