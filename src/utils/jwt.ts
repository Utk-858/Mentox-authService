import jwt, { SignOptions } from "jsonwebtoken";
import { UserPayload } from "../types";

// 🔐 Secrets
const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || JWT_SECRET;

// ✅ Throw error early if missing
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

// 🔧 Payload structure to keep consistent
const createPayload = (user: UserPayload) => ({
  sub: user._id,
  username: user.username,
  role: user.role,
  department: user.department,
  permissions: user.permissions,
});


// 🔑 Access Token (15m expiry)
export const generateAccessToken = (user: UserPayload): string => {
  const payload = createPayload(user);
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

// 🔁 Refresh Token (7d expiry)
export const generateRefreshToken = (user: UserPayload): string => {
  const payload = createPayload(user);
  return jwt.sign(payload, REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });
};

// ✅ Verify Refresh Token
export const verifyRefreshToken = (token: string): UserPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET!) as UserPayload;
};
