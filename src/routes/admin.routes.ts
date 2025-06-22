// routes/admin.routes.ts
import { Router } from "express";
import { authorizeRole, checkPermission } from "../middlewares/auth.middleware";
import { authenticateJWT } from "../middlewares/authenticateJWT";
const router = Router();

router.get("/admin-panel", authorizeRole("Admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get(
  "/admin-data",
  authenticateJWT,
  checkPermission("system_settings"),
  (req, res) => {
    res.json({ message: "Admin data accessed" });
  }
);
export default router;
  