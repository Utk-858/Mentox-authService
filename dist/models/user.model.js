"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const role_permissions_map_1 = require("../config/role-permissions.map");
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.keys(role_permissions_map_1.RolePermissionsMap),
        required: true,
    },
    department: { type: String }, // optional
    permissions: {
        type: [String],
    },
});
userSchema.pre("save", function (next) {
    if (!this.permissions || this.permissions.length === 0) {
        this.permissions = role_permissions_map_1.RolePermissionsMap[this.role] || [];
    }
    next();
});
exports.default = mongoose_1.default.model("User", userSchema);
