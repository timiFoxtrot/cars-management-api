import { Router } from "express";
import { createUserSchema, loginSchema } from "../common/validators";
import { CustomerRepository } from "../repositories/customer.repository";
import { CustomerService } from "../services/customer.service";
import { CustomerController } from "../controllers/customer.controller";

export const customerRouter = Router();

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

customerRouter.post(
  "/register",
  createUserSchema,
  customerController.registerCustomer
);

customerRouter.post("/login", loginSchema, customerController.loginCustomer);
