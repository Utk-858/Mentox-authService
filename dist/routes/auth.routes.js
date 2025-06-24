"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = require("../controllers/auth/login");
const create_test_user_1 = require("../controllers/auth/create-test-user");
const refresh_1 = require("../controllers/auth/refresh");
const logout_1 = require("../controllers/auth/logout");
const router = express_1.default.Router();
router.post("/login", login_1.login);
router.post("/create-test-user", create_test_user_1.createTestUser);
router.post("/refresh-token", refresh_1.refreshTokenController);
router.post("/logout", logout_1.logoutController);
exports.default = router;
