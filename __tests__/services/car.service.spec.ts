import { BadRequestError } from "../../src/common/errors/BadRequestError";
import { NotFoundError } from "../../src/common/errors/NotFoundError";
import { CarService } from "../../src/services/car.service";

const mockCarRepo = {
  createCar: jest.fn(),
  getCars: jest.fn(),
  getCar: jest.fn(),
  updateCar: jest.fn(),
  deleteCar: jest.fn(),
  purchaseCar: jest.fn(),
};

const mockCategoryRepo = {
  findById: jest.fn()
}

describe("CarService", () => {
  let carService: CarService;

  beforeEach(() => {
    jest.clearAllMocks();
    carService = new CarService(mockCarRepo as any, mockCategoryRepo as any);
  });

  it("should create a car", async () => {
    const carData = { brand: "Toyota" };
    const managerId = "manager1";
    mockCarRepo.createCar.mockResolvedValue(carData);

    const result = await carService.createCar(carData as any, managerId);
    expect(mockCarRepo.createCar).toHaveBeenCalledWith(carData, managerId);
    expect(result).toEqual(carData);
  });

  it("should get cars with filters", async () => {
    const queryParams = { brand: "Toyota", page: "1", limit: "10" } as any;
    const cars = [{ brand: "Toyota" }];
    mockCarRepo.getCars.mockResolvedValue(cars);

    const result = await carService.getCars(queryParams);
    expect(result).toEqual(cars);
  });

  it("should throw NotFoundError if car not found during update", async () => {
    mockCarRepo.updateCar.mockResolvedValue(null);

    await expect(
      carService.updateCar("carId", {}, "managerId")
    ).rejects.toThrow(NotFoundError);
  });

  it("should throw NotFoundError if car not found during delete", async () => {
    mockCarRepo.deleteCar.mockResolvedValue(null);

    await expect(carService.deleteCar("carId", "managerId")).rejects.toThrow(
      NotFoundError
    );
  });

  it("should throw BadRequestError if car is unavailable for purchase", async () => {
    mockCarRepo.purchaseCar.mockResolvedValue(null);

    await expect(carService.purchaseCar("carId", "customerId")).rejects.toThrow(
      BadRequestError
    );
  });
});
