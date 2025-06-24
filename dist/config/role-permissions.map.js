"use strict";
// src/config/role-permissions.map.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionsMap = void 0;
const permissions_config_1 = require("./permissions.config");
exports.RolePermissionsMap = {
    SuperAdmin: Object.values(permissions_config_1.Permissions), // ✅ All access
    Director: [
        permissions_config_1.Permissions.VIEW_STUDENT_PROFILE,
        permissions_config_1.Permissions.VIEW_ATTENDANCE,
        permissions_config_1.Permissions.VIEW_RESULTS,
        permissions_config_1.Permissions.ACCESS_DASHBOARD,
    ],
    Registrar: [
        permissions_config_1.Permissions.CREATE_USER,
        permissions_config_1.Permissions.EDIT_STUDENT_PROFILE,
        permissions_config_1.Permissions.VIEW_STUDENT_PROFILE,
        permissions_config_1.Permissions.DELETE_STUDENT_PROFILE,
    ],
    Admin: [
        permissions_config_1.Permissions.CREATE_USER,
        permissions_config_1.Permissions.DELETE_USER,
        permissions_config_1.Permissions.MANAGE_ROLES,
        permissions_config_1.Permissions.ACCESS_DASHBOARD,
        permissions_config_1.Permissions.SYSTEM_SETTINGS,
    ],
    HOD: [
        permissions_config_1.Permissions.VIEW_STUDENT_PROFILE,
        permissions_config_1.Permissions.VIEW_ATTENDANCE,
        permissions_config_1.Permissions.MANAGE_RESULTS,
        permissions_config_1.Permissions.MANAGE_TIMETABLE,
    ],
    Faculty: [
        permissions_config_1.Permissions.MANAGE_ATTENDANCE,
        permissions_config_1.Permissions.VIEW_RESULTS,
        permissions_config_1.Permissions.VIEW_TIMETABLE,
    ],
    Student: [
        permissions_config_1.Permissions.VIEW_RESULTS,
        permissions_config_1.Permissions.VIEW_ATTENDANCE,
        permissions_config_1.Permissions.VIEW_TIMETABLE,
    ],
    Librarian: [
        permissions_config_1.Permissions.ISSUE_BOOK,
        permissions_config_1.Permissions.RETURN_BOOK,
        permissions_config_1.Permissions.MANAGE_LIBRARY,
    ],
};
