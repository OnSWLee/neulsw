# Vercel 배포 설정 (neulsw 프론트엔드)

이 프로젝트는 **Next.js** 앱입니다. 로그인 API는 Vercel 서버리스 함수(`pages/api/auth/*`)로 동작합니다.

## Vercel 프로젝트 설정

**팀 설정이 아니라, 해당 프로젝트의 Settings로 들어가서 설정하세요.**

### General > Build & Development Settings

| 항목 | 값 |
|------|-----|
| **Framework Preset** | Next.js |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Install Command** | `npm install` |

### Environment Variables (필수)

| 변수 | 예시 | 설명 |
|------|------|------|
| `JWT_SECRET` | `랜덤_긴_문자열` | 로그인 토큰 서명용 (32자 이상 권장) |
| `ADMIN_USERNAME` | `admin` | 관리자 아이디 |
| `ADMIN_PASSWORD` | `운영용_강한_비밀번호` | 관리자 비밀번호 |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `hlql019b` | Sanity 프로젝트 ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity 데이터셋 |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | `https://xxx.sanity.studio` | 배포된 Sanity Studio URL |
| `NEXT_PUBLIC_SITE_URL` | `https://www.neulsw.com` | 사이트 URL |

> `NEXT_PUBLIC_API_URL`은 **설정하지 마세요.** 비워 두면 같은 도메인의 `/api/auth/login`을 사용합니다.

환경 변수 추가 후 **Redeploy**해야 반영됩니다.

## 로그인 동작

- 배포 사이트: `https://www.neulsw.com/api/auth/login`
- 관리자 로그인 후 `/admin` → Sanity Studio로 이동

## 한 줄 요약

- **Root Directory = `frontend`**, Framework = Next.js
- Vercel에 `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` 설정 후 재배포
