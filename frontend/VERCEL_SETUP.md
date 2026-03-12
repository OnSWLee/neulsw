# Vercel 배포 설정 (neulsw 프론트엔드)

이 프로젝트는 **Vite + React** 단일 페이지 앱(SPA)입니다.

## index.html 위치

- **경로:** `frontend/index.html` (프로젝트 루트가 `frontend`일 때는 `index.html`)
- **src 안에 있지 않습니다.** Root Directory를 **src로 두면 안 됩니다.**

## Vercel 프로젝트 설정

**팀 설정(Team Settings)이 아니라, 해당 프로젝트의 Settings로 들어가서 설정하세요.**

### General > Build & Development Settings

| 항목 | 값 |
|------|-----|
| **Framework Preset** | Vite |
| **Root Directory** | `frontend` (또는 상위에서 클론한 경우 해당 경로) |
| **Build Command** | `npm run build` (기본값) |
| **Output Directory** | `dist` (기본값) |
| **Install Command** | `npm install` (기본값) |

### Root Directory 설정이 중요한 이유

- 저장소 루트에는 `frontend`, `backend`, `sanity-studio` 폴더가 있습니다.
- **실제 웹 앱 코드와 index.html은 `frontend` 폴더 안에 있습니다.**
- Root Directory를 **`frontend`**로 두어야 Vercel이 `frontend/package.json`, `frontend/index.html`, `frontend/vite.config.ts`를 기준으로 빌드하고, 빌드 결과물 `frontend/dist`를 배포합니다.

### vercel.json

`frontend/vercel.json`에 SPA용 rewrite가 들어 있어서, `/`, `/blog`, `/doctor` 등 모든 경로 요청이 `index.html`로 넘어가고 React Router가 처리합니다. 이 파일은 이미 포함되어 있으므로 별도 수정 없이 사용하면 됩니다.

## 한 줄 요약

- **Root Directory를 `frontend`로 설정**하고, Framework Preset은 Vite, Output Directory는 `dist`로 두면 됩니다. (src로 두지 마세요.)
