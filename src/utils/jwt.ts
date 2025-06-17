import jwt, { SignOptions } from "jsonwebtoken";
import { UserPayload } from "../types"; // or wherever you define UserPayload


const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const generateToken = (user: UserPayload): string => {
  const payload = {
    sub: user._id,
    username: user.username,
    role: user.role,
    department: user.department,
    permissions: user.permissions,
  };

 const options: SignOptions = {
  expiresIn: (process.env.JWT_EXPIRES_IN || "15m") as SignOptions["expiresIn"],
};

  return jwt.sign(payload, JWT_SECRET, options);
};
