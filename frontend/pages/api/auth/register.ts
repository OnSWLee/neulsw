import type { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "../../../lib/auth-store";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password, name, birthDate } = req.body ?? {};

  if (!username || !password || !name || !birthDate) {
    return res.status(400).json({ error: "모든 필드를 입력해주세요." });
  }

  try {
    const result = await registerUser({ username, password, name, birthDate });
    if ("error" in result) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error("회원가입 오류:", error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
