import { Router } from "express";

export const router = Router();

const clinics = [
  {
    id: "thyroid",
    name: "갑상선 클리닉",
    focus: [
      "자가면역 갑상선염 · 그레이브스 병",
      "갑상선 기능 저하/항진, 임신·출산기 관리",
      "갑상선 안병증 부종·안구 불편감 완화"
    ]
  },
  {
    id: "core-immunity",
    name: "코어 면역 클리닉",
    focus: [
      "당뇨·항암 후 말초신경병증, 저림/시림·근력 저하",
      "만성 피로, 수면·스트레스 불균형, 면역 약화",
      "Adaptogen 기반 면역 강화 및 신경 재생"
    ]
  }
];

router.get("/", (_req, res) => {
  res.json({ clinics });
});

router.get("/:id", (req, res) => {
  const clinic = clinics.find((c) => c.id === req.params.id);
  if (!clinic) {
    return res.status(404).json({ message: "Clinic not found" });
  }
  return res.json(clinic);
});





