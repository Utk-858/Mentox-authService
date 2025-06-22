"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = exports.authorizeRole = void 0;
// 🟢 No explicit return type needed for the outer function
const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !allowedRoles.includes(user.role)) {
            res.status(403).json({ message: "Access denied: Role not authorized" });
            return;
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
const checkPermission = (...requiredPermissions) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !user.permissions) {
            res.status(403).json({ message: "Access denied: No permissions" });
            return;
        }
        console.log("User Permissions:", user.permissions);
        console.log("Required Permissions:", requiredPermissions);
        const hasAnyPermission = requiredPermissions.some(p => user.permissions.includes(p));
        if (!hasAnyPermission) {
            res.status(403).json({ message: "Access denied: Missing permissions" });
            return;
        }
        next();
    };
};
exports.checkPermission = checkPermission;
