import { Request, Response} from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import {generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { UserPayload } from "../types";
import jwt from "jsonwebtoken";

// 🔒 Refresh token secret
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

// 🔁 Send Refresh Token in HTTP-only cookie

// ♻️ Refresh Access Token
export const refreshTokenController = (req: Request, res: Response): void => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    res.status(401).json({ message: "No refresh token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as UserPayload;
    const newAccessToken = generateAccessToken(decoded);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

export const createTestUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, role, department } = req.body;

  const existing = await User.findOne({ username });
  if (existing) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
    role,
    department,
    // 👇 Do NOT manually pass permissions – let pre("save") handle it
  });

  await user.save(); // ✅ ensures pre("save") runs

  res.status(201).json({ message: "Test user created", user });
};


// 🚪 Logout controller
export const logoutController = (req: Request, res: Response): void => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/refresh-token", // match the path used during login
  });

  res.status(200).json({ message: "Logged out successfully" });
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(500).json({ message: "User not found" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const userPayload: UserPayload = {
    _id: user._id.toString(),
    username: user.username,
    role: user.role,
    department: user.department,
    permissions: user.permissions,
  };

  const accessToken = generateAccessToken(userPayload);
  const refreshToken = generateRefreshToken(userPayload);

  // Set refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/refresh-token",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ accessToken, user: userPayload });
};
