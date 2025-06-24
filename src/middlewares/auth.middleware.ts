import { Request, Response, NextFunction } from "express";
import { UserPayload } from "../types/";

// 🟢 No explicit return type needed for the outer function
export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as UserPayload;

    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({ message: "Access denied: Role not authorized" });
      return;
    }

    next();
  };
};

export const checkPermission = (...requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as UserPayload;

    if (!user || !user.permissions) {
      res.status(403).json({ message: "Access denied: No permissions" });
      return;
    }

    const hasPermission = requiredPermissions.every(p => user.permissions.includes(p));

    if (!hasPermission) {
      res.status(403).json({ message: "Access denied: Missing permissions" });
      return;
    }

    next();
  };
};
