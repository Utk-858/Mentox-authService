import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import facultyRoutes from "./routes/faculty.routes";
import adminRoutes from "./routes/admin.routes";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes);



const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
});

app.get("/", (req, res) => {
  res.send("Mentox Auth Service!");
});