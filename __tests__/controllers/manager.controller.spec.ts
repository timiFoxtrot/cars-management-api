import { Request, Response } from "express";
import { ManagerController } from "../../src/controllers/manager.controller";
import { ManagerService } from "../../src/services/manager.service";
import { ConflictError } from "../../src/common/errors/ConflictError";

describe("ManagerController", () => {
  let controller: ManagerController;
  let service: Partial<ManagerService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    service = {
      createManager: jest.fn(),
      login: jest.fn(),
      getCustomers: jest.fn(),
    };
    controller = new ManagerController(service as ManagerService);

    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should register manager", async () => {
    (service.createManager as jest.Mock).mockResolvedValue({ id: "123" });
    await controller.registerManager(req as Request, res as Response);

    expect(service.createManager).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Registration successful",
      data: { id: "123" },
    });
  });

  it("should login manager", async () => {
    req.body = { email: "test@example.com", password: "1234" };
    (service.login as jest.Mock).mockResolvedValue({ token: "abc" });

    await controller.loginManager(req as Request, res as Response);

    expect(service.login).toHaveBeenCalledWith("test@example.com", "1234");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Login successful",
      data: { token: "abc" },
    });
  });

  it("should fetch customers", async () => {
    (service.getCustomers as jest.Mock).mockResolvedValue([{ name: "Alice" }]);

    await controller.fetchCustomers(req as Request, res as Response);

    expect(service.getCustomers).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Customers fetched successfully",
      data: [{ name: "Alice" }],
    });
  });

  it("should return 409 if email already exists", async () => {
    (service.createManager as jest.Mock).mockRejectedValue(
      new ConflictError("Email already taken")
    );

    await controller.registerManager(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Email already taken",
    });
  });

  it("should return 401 for invalid password", async () => {
    (service.login as jest.Mock).mockRejectedValue({
      statusCode: 401,
      message: "Invalid credential",
    });

    await controller.loginManager(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Invalid credential",
    });
  });
});
