import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import facultyRoutes from "./routes/faculty.routes";
import adminRoutes from "./routes/admin.routes";
import cookieParser from "cookie-parser";
import { loggerMiddleware } from "./middlewares/logger";

const app = express();
app.set('trust proxy', true);
const allowedOrigins = [
  "https://mentox-erp-frontend-utk-858-utk-858s-projects.vercel.app",
  'https://mentox-api-gateway.onrender.com'
  
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow cookies if needed
  })
);


app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);

// app.use("/api/auth", authRoutes);
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

app.post("/api/auth/login", (req, res) => {
  console.log("Login endpoint hit");
  res.send("Login endpoint hit");
});