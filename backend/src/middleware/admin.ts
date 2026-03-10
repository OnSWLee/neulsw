import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";
import { users } from "../routes/auth";

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.userId) {
    return res.status(401).json({
      error: "인증이 필요합니다."
    });
  }

  const user = users.find((u) => u.id === req.userId);
  if (!user || !user.isAdmin) {
    return res.status(403).json({
      error: "관리자 권한이 필요합니다."
    });
  }

  next();
};


