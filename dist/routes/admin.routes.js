"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/admin.routes.ts
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authenticateJWT_1 = require("../middlewares/authenticateJWT");
const router = (0, express_1.Router)();
router.get("/admin-panel", authenticateJWT_1.authenticateJWT, (0, auth_middleware_1.authorizeRole)("Admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});
router.get("/admin-data", authenticateJWT_1.authenticateJWT, (0, auth_middleware_1.checkPermission)("system_settings"), (req, res) => {
    res.json({ message: "Admin data accessed" });
});
exports.default = router;
