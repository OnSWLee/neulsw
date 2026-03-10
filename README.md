# 경희늘품한의원 풀스택 스캐폴드

React(Typescript) + TailwindCSS 프론트엔드와 Node.js(Express) 백엔드를 Docker로 실행할 수 있는 기본 구조입니다.

## 구조
- `frontend`: React + Vite + Tailwind
- `backend`: Express API (TS)
- `docker-compose.yml`: 프론트/백엔드 컨테이너 오케스트레이션

## 로컬 실행 (개발)
```bash
# 프론트
cd frontend
npm install
npm run dev

# 백엔드
cd backend
npm install
npm run dev
```

## Docker 실행 (프로덕션 모드)
```bash
docker-compose up --build
# 프론트: http://localhost:4173
# 백엔드: http://localhost:3000
```

## 라우팅 개요
- `/` 홈
- `/doctor` 원장 소개/칼럼
- `/clinics` 전문 클리닉 목록
  - `/clinics/thyroid`
  - `/clinics/neuropathy`
  - `/clinics/adaptogen`
- `/reviews` 후기





