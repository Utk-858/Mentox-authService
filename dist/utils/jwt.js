"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 🔐 Secrets
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || JWT_SECRET;
// ✅ Throw error early if missing
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
}
// 🔧 Payload structure to keep consistent
const createPayload = (user) => ({
    sub: user._id,
    username: user.username,
    role: user.role,
    department: user.department,
    permissions: user.permissions,
});
// 🔑 Access Token (15m expiry)
const generateAccessToken = (user) => {
    const payload = createPayload(user);
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};
exports.generateAccessToken = generateAccessToken;
// 🔁 Refresh Token (7d expiry)
const generateRefreshToken = (user) => {
    const payload = createPayload(user);
    return jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
exports.generateRefreshToken = generateRefreshToken;
// ✅ Verify Refresh Token
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
