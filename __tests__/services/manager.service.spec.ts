import { CustomerRepository } from "../../src/repositories/customer.repository";
import { ManagerRepository } from "../../src/repositories/manager.repository";
import { ManagerService } from "../../src/services/manager.service";
import { UnauthorizedError } from "../../src/common/errors/UnauthorizedError";
import { HashService } from "../../src/services/hash.service";
import { TokenService } from "../../src/services/token.service";
import { ConflictError } from "../../src/common/errors/ConflictError";

describe("ManagerService", () => {
  let managerService: ManagerService;
  let mockManagerRepo: Partial<ManagerRepository>;
  let mockCustomerRepo: Partial<CustomerRepository>;
  let mockHashService: Partial<HashService>;
  let mockTokenService: Partial<TokenService>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockManagerRepo = {
      createManager: jest.fn(),
      findByEmail: jest.fn(),
    };
    mockCustomerRepo = {
      getCustomers: jest.fn(),
    };
    mockHashService = {
      hash: jest.fn(),
      compare: jest.fn(),
    };
    mockTokenService = {
      sign: jest.fn(),
    };

    managerService = new ManagerService(
      mockManagerRepo as ManagerRepository,
      mockCustomerRepo as CustomerRepository,
      mockHashService as HashService,
      mockTokenService as TokenService
    );
  });

  it("should create a manager", async () => {
    const managerData = { email: "test@example.com", password: "1234" } as any;

    (mockHashService.hash as jest.Mock).mockResolvedValue("hashedPassword");
    (mockManagerRepo.createManager as jest.Mock).mockImplementation(
      async (data) => data
    );

    const result = await managerService.createManager(managerData);

    expect(mockHashService.hash).toHaveBeenCalledWith("1234");
    expect(mockManagerRepo.createManager).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "test@example.com",
        password: "hashedPassword",
      })
    );
    expect(result).toEqual({
      email: "test@example.com",
      password: "hashedPassword",
    });
  });

  it("should return token on login", async () => {
    const manager = {
      _id: "abc123",
      email: "test@example.com",
      password: "hashedPassword",
    };

    (mockManagerRepo.findByEmail as jest.Mock).mockResolvedValue(manager);
    (mockHashService.compare as jest.Mock).mockResolvedValue(true);
    (mockTokenService.sign as jest.Mock).mockReturnValue("mock-token");

    const result = await managerService.login("test@example.com", "1234");

    expect(mockManagerRepo.findByEmail).toHaveBeenCalledWith(
      "test@example.com"
    );
    expect(mockHashService.compare).toHaveBeenCalledWith(
      "1234",
      "hashedPassword"
    );
    expect(mockTokenService.sign).toHaveBeenCalledWith(
      { id: manager._id, role: "manager" },
      "1d"
    );
    expect(result).toEqual("mock-token");
  });

  it("should fetch customers", async () => {
    const mockCustomers = [{ name: "Alice" }, { name: "Bob" }];
    (mockCustomerRepo.getCustomers as jest.Mock).mockResolvedValue(
      mockCustomers
    );

    const result = await managerService.getCustomers();
    expect(result).toEqual(mockCustomers);
  });

  it("should throw UnauthorizedError if email is not found during login", async () => {
    (mockManagerRepo.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(managerService.login("no@user.com", "1234")).rejects.toThrow(
      UnauthorizedError
    );
  });

  it("should throw UnauthorizedError if password is incorrect", async () => {
    (mockManagerRepo.findByEmail as jest.Mock).mockResolvedValue({
      _id: "id",
      email: "test@user.com",
      password: "hashed",
    });

    (mockHashService.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      managerService.login("test@user.com", "wrongpass")
    ).rejects.toThrow(UnauthorizedError);
  });

  it("should throw ConflictError if email already exists during registration", async () => {
    (mockManagerRepo.createManager as jest.Mock).mockImplementation(() => {
      throw new ConflictError("Email already taken");
    });

    await expect(
      managerService.createManager({
        email: "exists@email.com",
        password: "1234",
      } as any)
    ).rejects.toThrow(ConflictError);
  });
});
