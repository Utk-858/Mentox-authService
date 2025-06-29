// src/config/role-permissions.map.ts

import { Permissions } from "./permissions.config";

export const RolePermissionsMap: Record<string, string[]> = {
  SuperAdmin: Object.values(Permissions), // ✅ All access

  Director: [
    Permissions.VIEW_STUDENT_PROFILE,
    Permissions.VIEW_ATTENDANCE,
    Permissions.VIEW_RESULTS,
    Permissions.ACCESS_DASHBOARD,
  ],

  Registrar: [
    Permissions.CREATE_USER,
    Permissions.EDIT_STUDENT_PROFILE,
    Permissions.VIEW_STUDENT_PROFILE,
    Permissions.DELETE_STUDENT_PROFILE,
  ],

  Admin: [
    Permissions.CREATE_USER,
    Permissions.DELETE_USER,
    Permissions.MANAGE_ROLES,
    Permissions.ACCESS_DASHBOARD,
    Permissions.SYSTEM_SETTINGS,
  ],

  HOD: [
    Permissions.VIEW_STUDENT_PROFILE,
    Permissions.VIEW_ATTENDANCE,
    Permissions.MANAGE_RESULTS,
    Permissions.MANAGE_TIMETABLE,
  ],

  Faculty: [
    Permissions.MANAGE_ATTENDANCE,
    Permissions.VIEW_RESULTS,
    Permissions.VIEW_TIMETABLE,
    Permissions.CREATE_COURSE,
    Permissions.EDIT_COURSE,
    Permissions.DELETE_COURSE,
  ],

  Student: [
    Permissions.VIEW_RESULTS,
    Permissions.VIEW_ATTENDANCE,
    Permissions.VIEW_TIMETABLE,
  ],

  Librarian: [
    Permissions.ISSUE_BOOK,
    Permissions.RETURN_BOOK,
    Permissions.MANAGE_LIBRARY,
  ],
};
