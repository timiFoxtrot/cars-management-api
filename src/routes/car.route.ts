import { Router } from "express";
import {
  carParamSchema,
  createCarSchema,
  getCarsQuerySchema,
  updateCarSchema,
} from "../common/validators";
import { CarRepository } from "../repositories/car.repository";
import { CarService } from "../services/car.service";
import { CarController } from "../controllers/car.controller";
import { authenticate, authorize, roles } from "../common/middlewares/auth";
import { CategoryRepository } from "../repositories/category.repository";

export const carRouter = Router();

const carRepository = new CarRepository();
const categoryRepository = new CategoryRepository();
const carService = new CarService(carRepository, categoryRepository);
const carController = new CarController(carService);

carRouter.post(
  "/",
  createCarSchema,
  authenticate(),
  authorize([roles.MANAGER]),
  carController.createCar
);
carRouter.post(
  "/:id/purchase",
  authenticate(),
  authorize([roles.CUSTOMER]),
  carController.purchaseCar
);
carRouter.get("/", getCarsQuerySchema, carController.getCars);
carRouter.get("/:id", carParamSchema, carController.getCar);
carRouter.patch("/:id", updateCarSchema, carController.updateCar);
carRouter.delete("/:id", carParamSchema, carController.deleteCar);
