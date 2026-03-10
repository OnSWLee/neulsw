# Sanity Studio

이 폴더는 Sanity CMS의 관리자 인터페이스(Studio)입니다.

## 설치

```bash
npm install
```

## 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

## 실행

개발 모드:
```bash
npm run dev
```

프로덕션 빌드:
```bash
npm run build
```

배포:
```bash
npm run deploy
```

## 접속

개발 모드에서는 `http://localhost:3333`에서 접속할 수 있습니다.

메인 웹사이트의 `/admin` 경로에서 자동으로 이 Studio로 리다이렉트됩니다.


