import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../../utils/jwt";
import { UserPayload } from "../../types";
// ♻️ Refresh Access Token


const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;


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