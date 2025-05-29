import { Request, Response } from "express";
import { ManagerService } from "../services/manager.service";

export class ManagerController {
  constructor(private managerService: ManagerService) {}

  registerManager = async (req: Request, res: Response) => {
    try {
      const result = await this.managerService.createManager(req.body);
      res.status(201).json({
        status: "success",
        message: "Registration successful",
        data: result,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "An error occurred during manager signup",
      });
    }
  };

  loginManager = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.managerService.login(email, password);
      res.status(201).json({
        status: "success",
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "An error occurred during manager login",
      });
    }
  };

  fetchCustomers = async (req: Request, res: Response) => {
    try {
        const result = await this.managerService.getCustomers()
        res.status(200).json({
            status: "success",
            message: "Customers fetched successfully",
            data: result,
          });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message || "An error occurred fetching customers",
          });
    }
  }
}
