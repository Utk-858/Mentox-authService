"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../../utils/jwt");
// ♻️ Refresh Access Token
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenController = (req, res) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    if (!token) {
        res.status(401).json({ message: "No refresh token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = (0, jwt_1.generateAccessToken)(decoded);
        res.status(200).json({ accessToken: newAccessToken });
    }
    catch (err) {
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};
exports.refreshTokenController = refreshTokenController;
