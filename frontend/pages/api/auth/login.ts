import type { NextApiRequest, NextApiResponse } from "next";
import { loginUser } from "../../../lib/auth-store";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body ?? {};

  if (!username || !password) {
    return res.status(400).json({ error: "아이디와 비밀번호를 입력해주세요." });
  }

  try {
    const result = await loginUser(username, password);
    if (!result) {
      return res.status(401).json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." });
    }

    return res.status(200).json({
      message: "로그인 성공",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
