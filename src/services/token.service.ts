import jwt from "jsonwebtoken";
import { config } from "../common/config";

export class TokenService {
  private secret = config.JWT_SECRET || "default_secret";

  sign(payload: object, expiresIn: any): string {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  verify<T = any>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }
}
