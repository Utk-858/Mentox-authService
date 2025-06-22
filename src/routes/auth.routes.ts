import express from "express";
import { login,createTestUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/create-test-user", createTestUser);

export default router;
