import { Router } from "express";
import { ManagerRepository } from "../repositories/manager.repository";
import { ManagerService } from "../services/manager.service";
import { ManagerController } from "../controllers/manager.controller";
import { createUserSchema, loginSchema } from "../common/validators";
import { CustomerRepository } from "../repositories/customer.repository";
import { authenticate, authorize, roles } from "../common/middlewares/auth";

export const managerRouter = Router();

const managerRepository = new ManagerRepository();
const customerRepository = new CustomerRepository();
const managerService = new ManagerService(
  managerRepository,
  customerRepository
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
