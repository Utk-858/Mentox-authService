"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = void 0;
// 🚪 Logout controller
const logoutController = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/auth/refresh-token", // match the path used during login
    });
    res.status(200).json({ message: "Logged out successfully" });
};
exports.logoutController = logoutController;
