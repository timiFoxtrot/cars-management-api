import { Router } from "express";
import { ManagerRepository } from "../repositories/manager.repository";
import { ManagerService } from "../services/manager.service";
import { ManagerController } from "../controllers/manager.controller";
import { createUserSchema, loginSchema } from "../common/validators";
import { CustomerRepository } from "../repositories/customer.repository";
import { authenticate, authorize, roles } from "../common/middlewares/auth";
import { HashService } from "../services/hash.service";
import { TokenService } from "../services/token.service";

export const managerRouter = Router();

const managerRepository = new ManagerRepository();
const customerRepository = new CustomerRepository();
const hashService = new HashService();
const tokenService = new TokenService();
const managerService = new ManagerService(
  managerRepository,
  customerRepository,
  hashService,
  tokenService
);
const managerController = new ManagerController(managerService);

managerRouter.post(
  "/register",
  createUserSchema,
  managerController.registerManager
);

managerRouter.post("/login", loginSchema, managerController.loginManager);
managerRouter.get(
  "/view-customers",
  authenticate(),
  authorize([roles.MANAGER]),
  managerController.fetchCustomers
);
