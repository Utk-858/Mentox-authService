import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/user.model";
import { UserPayload } from "../../types";  

export const registerStudent=async(req:Request,res:Response):Promise<void> =>
{
  const {username,password} = req.body;
  const existing = await User.findOne({ username });
  if (existing) {
    res.status(409).json({ message: "User already exists" });
    return;
  }
    const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
    role:"Student",
  
  })
   await user.save();
    res.status(201).json({ message: "Student Credentials created", user });
}