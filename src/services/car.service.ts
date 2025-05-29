import { BadRequestError } from "../common/errors/BadRequestError";
import { NotFoundError } from "../common/errors/NotFoundError";
import { ICar } from "../models/car.model";
import { CarRepository } from "../repositories/car.repository";

export class CarService {
  constructor(private readonly carRepo: CarRepository) {}

  async createCar(carData: ICar, managerId: string) {
    return await this.carRepo.createCar(carData, managerId);
  }

  async getCars(queryParams: {
    brand: string;
    model: string;
    minPrice: string;
    maxPrice: string;
    available: string;
    page: string;
    limit: string;
  }) {
    return this.carRepo.getCars(queryParams);
  }

  async getCar(carId: string) {
    return this.carRepo.getCar(carId);
  }

  async updateCar(carId: string, carData: Partial<ICar>, managerId: string) {
    const updatedCar = await this.carRepo.updateCar(carId, carData, managerId);
    if (!updatedCar) {
      throw new NotFoundError("Car not found or unauthorized");
    }

    return updatedCar.toObject();
  }

  async deleteCar(carId: string, managerId: string) {
    const deletedCar = await this.carRepo.deleteCar(carId, managerId);
    if (!deletedCar) {
      throw new NotFoundError("Car not found or unauthorized");
    }
    return deletedCar
  }

  async purchaseCar(carId: string, customerId: string) {
    const purchasedCar = await this.carRepo.purchaseCar(carId, customerId);
    if (!purchasedCar) {
      throw new BadRequestError("Car unavailable");
    }
    return purchasedCar.toObject();
  }
}
