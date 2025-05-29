import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

export class CustomerController {
  constructor(private customerService: CustomerService) {}

  registerCustomer = async (req: Request, res: Response) => {
    try {
      const result = await this.customerService.createCustomer(req.body);
      res.status(201).json({
        status: "success",
        message: "Registration successful",
        data: result,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "An error occurred during customer signup",
      });
    }
  };

  loginCustomer = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.customerService.login(email, password);
      res.status(201).json({
        status: "success",
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "An error occurred during customer login",
      });
    }
  };
}
