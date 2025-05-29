import { Request, Response } from "express";
import { CarController } from "../../src/controllers/car.controller";

const mockCarService = {
  createCar: jest.fn(),
  getCars: jest.fn(),
  getCar: jest.fn(),
  updateCar: jest.fn(),
  deleteCar: jest.fn(),
  purchaseCar: jest.fn(),
};

const mockRes = () => {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("CarController", () => {
  let carController: CarController;

  beforeEach(() => {
    jest.clearAllMocks();
    carController = new CarController(mockCarService as any);
  });

  it("should handle createCar success", async () => {
    const req = {
      body: { model: "Model X" },
      user: { id: "manager1" },
    } as Request;
    const res = mockRes();
    mockCarService.createCar.mockResolvedValue(req.body);

    await carController.createCar(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Car created successfully",
      })
    );
  });

  it("should handle getCars success", async () => {
    const req = { query: {} } as Request;
    const res = mockRes();
    mockCarService.getCars.mockResolvedValue([]);

    await carController.getCars(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Cars fetched successfully",
      })
    );
  });

  it("should handle updateCar error", async () => {
    const req = {
      params: { id: "car1" },
      body: {},
      user: { id: "manager1" },
    } as any;
    const res = mockRes();
    mockCarService.updateCar.mockRejectedValue({
      statusCode: 404,
      message: "Not found",
    });

    await carController.updateCar(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Not found",
      })
    );
  });

  it("should handle purchaseCar success", async () => {
    const req = {
      params: { id: "car1" },
      user: { id: "customer1" },
    } as any;
    const res = mockRes();
    mockCarService.purchaseCar.mockResolvedValue({ id: "car1" });

    await carController.purchaseCar(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Car purchased successfully",
      })
    );
  });
});
