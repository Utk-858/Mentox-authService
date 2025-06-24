import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";    
import { UserPayload } from "../../types";


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
