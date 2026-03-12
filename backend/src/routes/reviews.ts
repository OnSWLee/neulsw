import express from "express";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// 치료 후기 데이터 (실제 프로덕션에서는 데이터베이스에서 가져옴)
const reviews = [
  {
    id: "1",
    name: "A님 (30대, 직장인)",
    text: "갑상선 항진으로 체중·수면이 무너졌는데, 혈액검사 수치와 함께 관리해 주셔서 안심하고 치료받았습니다."
  },
  {
    id: "2",
    name: "B님 (50대, 항암 후 회복)",
    text: "항암 후 손발 저림이 심했는데, 침·약침과 한약 병행 후 통증이 단계적으로 줄어들었습니다."
  },
  {
    id: "3",
    name: "C님 (20대, 수험생)",
    text: "Adaptogen 프로그램으로 아침 피로감이 확 줄고, 집중력이 돌아왔어요."
  }
];

// 인증이 필요한 치료 후기 조회
router.get("/", authenticateToken, (req, res) => {
  res.json({
    reviews
  });
});

export { router };





