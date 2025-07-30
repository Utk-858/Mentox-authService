import express from "express";
import { login } from "../controllers/auth/login";
import { createTestUser } from "../controllers/auth/create-test-user";
import { refreshTokenController } from "../controllers/auth/refresh";
import { logoutController } from "../controllers/auth/logout";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { registerStudent } from "../controllers/auth/studentRegister";

const router = express.Router();

router.post("/login",login);
router.post("/create-test-user", createTestUser);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutController);
router.get("/",(req,res)=>{
  res.send("Hello")
})
router.post("/create-student-creds",registerStudent);
export default router;
