import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
// import User from "../../models/customer.model";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { config } from "../config";

declare global {
  namespace Express {
    interface Request {
      user: { id: string; role: string };
      token?: string | null;
    }
  }
}

export enum roles {
  MANAGER = "manager",
  CUSTOMER = "customer",
}

export const authenticate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Invalid authorization header",
      });
      return;
    }

    const [, token] = authorization.split(" ");

    try {
      if (!token) {
        res.status(401).json({
          status: "error",
          statusCode: 401,
          message: "No token provided",
        });
        return;
      }

      const decoded = jwt.verify(token, config.JWT_SECRET!) as jwt.JwtPayload;

      // const user: any = await User.findById(decoded.id);
      // if (!user) {
      //   res.status(401).json({ message: "Access denied" });
      //   return;
      // }

      const user = decoded as { id: string; role: string };

      //   if (param.isAdmin) {
      //     if (!user.roles.includes(Roles.ADMIN)) {
      //       return res.status(401).json({
      //         status: "error",
      //         statusCode: 401,
      //         message: "You are not authorized",
      //       });
      //     }
      //   }

      // delete user.toObject().password;
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.status(401).json({ status: "error", message: error.message });
        return;
      }

      if (error instanceof JsonWebTokenError) {
        next(new UnauthorizedError("Invalid token"));
        return;
      }

      res
        .status(error.statusCode)
        .json({ status: "error", message: error.message });
      return;
    }
  };
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
};
