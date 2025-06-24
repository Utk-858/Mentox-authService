"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.logoutController = exports.createTestUser = exports.refreshTokenController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 🔒 Refresh token secret
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
// 🔁 Send Refresh Token in HTTP-only cookie
// ♻️ Refresh Access Token
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
const createTestUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role, department } = req.body;
    const existing = yield user_model_1.default.findOne({ username });
    if (existing) {
        res.status(409).json({ message: "User already exists" });
        return;
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = new user_model_1.default({
        username,
        password: hashedPassword,
        role,
        department,
        // 👇 Do NOT manually pass permissions – let pre("save") handle it
    });
    yield user.save(); // ✅ ensures pre("save") runs
    res.status(201).json({ message: "Test user created", user });
});
exports.createTestUser = createTestUser;
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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_model_1.default.findOne({ username });
    if (!user) {
        res.status(500).json({ message: "User not found" });
        return;
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const userPayload = {
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
        department: user.department,
        permissions: user.permissions,
    };
    const accessToken = (0, jwt_1.generateAccessToken)(userPayload);
    const refreshToken = (0, jwt_1.generateRefreshToken)(userPayload);
    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/auth/refresh-token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken, user: userPayload });
});
exports.login = login;
