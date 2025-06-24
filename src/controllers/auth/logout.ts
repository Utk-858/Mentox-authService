import { Request, Response } from "express";


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