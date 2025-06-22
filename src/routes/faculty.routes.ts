// routes/faculty.routes.ts
import { Router } from "express";
import { authorizeRole } from "../middlewares/auth.middleware";

const router = Router();

router.get("/faculty-dashboard", authorizeRole("Faculty"), (req, res) => {
  res.json({ message: "Welcome Faculty" });
});

export default router;
