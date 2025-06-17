import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const userPayload = {
    ...user.toObject(),
    _id: user._id.toString(), // ✅ convert ObjectId to string
  };

  const accessToken = generateToken(userPayload);

  res.status(200).json({
    accessToken,
    user: {
      username: user.username,
      role: user.role,
      department: user.department,
      permissions: user.permissions,
    },
  });
};
