"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/faculty.routes.ts
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/faculty-dashboard", (0, auth_middleware_1.authorizeRole)("Faculty"), (req, res) => {
    res.json({ message: "Welcome Faculty" });
});
exports.default = router;
