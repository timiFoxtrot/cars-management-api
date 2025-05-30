import { Request, Response } from "express";
import { CarService } from "../services/car.service";
import logger from "../utils/logger";

export class CarController {
  constructor(private readonly carService: CarService) {}

  createCar = async (req: Request, res: Response) => {
    try {
      const managerId = req.user.id;
      const result = await this.carService.createCar(req.body, managerId);
      res.status(201).json({
        status: "success",
        message: "Car created successfully",
        data: result,
      });
    } catch (error) {
      logger.error(`ERROR CREATING CAR:: ${error.message}`);
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "An error occurred while creating car",
      });
    }
  };

  getCars = async (req: Request, res: Response) => {
    try {
      const queryParams = req.query as {
        brand: string;
        model: string;
        minPrice: string;
        maxPrice: string;
        available: string;
        page: string;
        limit: string;
      };
      const result = await this.carService.getCars(queryParams);
      res.status(200).json({
        status: "success",
        message: "Cars fetched successfully",
        data: result,
      });
    } catch (error) {
      logger.error(`ERROR FETCHING CARS:: ${error.message}`);
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "An error occurred while fetching cars",
      });
    }
  };

  getCar = async (req: Request, res: Response) => {
    try {
      const carId = req.params.id as string;
      const result = await this.carService.getCar(carId);
      res.status(200).json({
        status: "success",
        message: "Car fetched successfully",
        data: result,
      });
    } catch (error) {
      logger.error(`ERROR FETCHING CAR:: ${error.message}`);
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "An error occurred while fetching car",
      });
    }
  };

  updateCar = async (req: Request, res: Response) => {
    try {
      const managerId = req.user.id;
      const carId = req.params.id as string;
      const result = await this.carService.updateCar(carId, req.body, managerId);
      res.status(200).json({
        status: "success",
        message: "Car updated successfully",
        data: result,
      });
    } catch (error) {
      logger.error(`ERROR UPDATING CAR:: ${error.message}`);
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "An error occurred while updating car",
      });
    }
  };

  deleteCar = async (req: Request, res: Response) => {
    try {
      const managerId = req.user.id;
      const carId = req.params.id as string;
      const result = await this.carService.deleteCar(carId, managerId);
      res.status(200).json({
        status: "success",
        message: "Car deleted successfully",
        data: result,
      });
    } catch (error) {
      logger.error(`ERROR DELETING CAR:: ${error.message}`);
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "An error occurred while deleting car",
      });
    }
  };

  purchaseCar = async (req: Request, res: Response) => {
    try {
      const customerId = req.user.id;
      const carId = req.params.id as string;
      const result = await this.carService.purchaseCar(carId, customerId);
      res.status(200).json({
        status: "success",
        message: "Car purchased successfully",
        data: result,
      });
    } catch (error) {
      logger.error(`ERROR PURCHASING CAR:: ${error.message}`);
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "An error occurred while purchasing car",
      });
    }
  };
}
