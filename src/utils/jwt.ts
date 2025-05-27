import jwt from "jsonwebtoken";
import { config } from "../common/config";

export class JWT {
  private static secret: jwt.Secret = config.JWT_SECRET as string;

  public static encode<T>(
    payload: Partial<T>,
    options?: Partial<jwt.SignOptions>
  ): string {
    try {
      const token = jwt.sign(payload, this.secret, {
        expiresIn: config.JWT_EXPIRY_TIME as any,
        ...options,
      });
      return token;
    } catch (error) {
      throw error;
    }
  }

  public static decode(token: string): jwt.JwtPayload {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded as jwt.JwtPayload;
    } catch (error) {
      throw error;
    }
  }
}
