import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// 간단한 인메모리 저장소 (실제 프로덕션에서는 데이터베이스 사용)
interface User {
  id: string;
  username: string;
  password: string; // 해시된 비밀번호
  name: string;
  birthDate: string;
  isAdmin?: boolean; // 관리자 여부
}

export const users: User[] = [];

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// 기본 관리자 계정 생성 함수 (index.ts에서 호출)
export const initializeAdmin = async () => {
  const DEFAULT_ADMIN_USERNAME = "admin";
  const DEFAULT_ADMIN_PASSWORD = "admin123"; // 실제로는 더 강력한 비밀번호 사용

  const existingAdmin = users.find((u) => u.username === DEFAULT_ADMIN_USERNAME);
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
    users.push({
      id: "admin-1",
      username: DEFAULT_ADMIN_USERNAME,
      password: hashedPassword,
      name: "관리자",
      birthDate: "1990-01-01",
      isAdmin: true
    });
    console.log("기본 관리자 계정이 생성되었습니다. (username: admin, password: admin123)");
  }
};

// 디버그: 사용자 목록 확인 (개발용)
router.get("/debug/users", (_req, res) => {
  res.json({
    totalUsers: users.length,
    users: users.map(u => ({
      id: u.id,
      username: u.username,
      name: u.name,
      isAdmin: u.isAdmin
    }))
  });
});

// 회원가입
router.post("/register", async (req, res) => {
  try {
    const { username, password, name, birthDate } = req.body;

    // 입력 검증
    if (!username || !password || !name || !birthDate) {
      return res.status(400).json({
        error: "모든 필드를 입력해주세요."
      });
    }

    // 중복 아이디 체크
    if (users.find((u) => u.username === username)) {
      return res.status(400).json({
        error: "이미 사용 중인 아이디입니다."
      });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
      name,
      birthDate
    };

    users.push(newUser);

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        birthDate: newUser.birthDate
      }
    });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).json({
      error: "서버 오류가 발생했습니다."
    });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("로그인 시도:", { username, usersCount: users.length });

    // 입력 검증
    if (!username || !password) {
      return res.status(400).json({
        error: "아이디와 비밀번호를 입력해주세요."
      });
    }

    // 사용자 찾기
    const user = users.find((u) => u.username === username);
    if (!user) {
      console.log("사용자를 찾을 수 없음:", username);
      return res.status(401).json({
        error: "아이디 또는 비밀번호가 올바르지 않습니다."
      });
    }

    // 비밀번호 확인
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("비밀번호 불일치:", username);
      return res.status(401).json({
        error: "아이디 또는 비밀번호가 올바르지 않습니다."
      });
    }

    console.log("로그인 성공:", username);

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "로그인 성공",
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        birthDate: user.birthDate,
        isAdmin: user.isAdmin || false
      }
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({
      error: "서버 오류가 발생했습니다."
    });
  }
});

export { router };
