import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ensureAdminUser, getUserById, toPublicUser } from "../../../lib/auth-store";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "인증이 필요합니다." });
  }

  try {
    await ensureAdminUser();
    const decoded = jwt.verify(token, JWT_SECRET) as { userId?: string };
    if (!decoded.userId) {
      return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
    }

    const user = getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "사용자를 찾을 수 없습니다." });
    }

    return res.status(200).json({ user: toPublicUser(user) });
  } catch {
    return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
  }
}
