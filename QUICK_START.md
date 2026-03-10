# Sanity CMS 빠른 시작 가이드

## ✅ 프로젝트 정보
- **Project ID**: `hlql019b`
- **Project Name**: SeungWookLee
- **Dataset**: production
- **Plan**: Free tier

## 🚀 빠른 시작

### 1. 프론트엔드 의존성 설치

Docker 컨테이너 내부에서 실행:

```bash
docker exec kyunghee-frontend-dev sh -c "cd /app && npm install @sanity/client @sanity/image-url"
```

또는 로컬에서:

```bash
cd frontend
npm install @sanity/client @sanity/image-url
```

### 2. Sanity Studio 의존성 설치

로컬에서 실행 (Docker 외부):

```bash
cd sanity-studio
npm install
```

### 3. 환경 변수 설정

**`sanity-studio/.env.local` 파일 생성:**
```env
SANITY_STUDIO_PROJECT_ID=hlql019b
SANITY_STUDIO_DATASET=production
```

**`frontend/.env.local` 파일 생성:**
```env
VITE_SANITY_PROJECT_ID=hlql019b
VITE_SANITY_DATASET=production
VITE_SANITY_STUDIO_URL=http://localhost:3333
```

> ⚠️ **참고**: `.env.local` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다. 
> 하지만 설정 파일(`sanity.config.ts`, `sanity.ts`)에 기본값이 이미 설정되어 있어 
> 환경 변수 파일이 없어도 작동합니다.

### 4. Sanity Studio 실행

새 터미널에서:

```bash
cd sanity-studio
npm run dev
```

Sanity Studio가 `http://localhost:3333`에서 실행됩니다.

### 5. 프론트엔드 재시작

```bash
docker restart kyunghee-frontend-dev
```

## 📝 사용 방법

### 관리자 페이지 접속

1. 웹사이트에서 `/admin` 경로로 접속
2. 자동으로 Sanity Studio (`http://localhost:3333`)로 리다이렉트
3. **처음 접속 시**: Sanity 계정으로 로그인 필요
   - Sanity.io 계정의 이메일과 비밀번호 사용
   - 또는 Google/GitHub 계정으로 로그인 가능

### 블로그 글 작성

1. Sanity Studio에서 "블로그 포스트" 문서 타입 선택
2. "Create new" 버튼 클릭
3. 필수 필드 작성:
   - **제목**: 블로그 글 제목
   - **슬러그**: URL에 사용 (자동 생성 가능 - 제목 옆 버튼 클릭)
   - **요약**: 블로그 글 요약 (최대 200자)
   - **내용**: 블로그 글 본문
   - **메인 이미지**: 블로그 글 대표 이미지 (선택)
   - **작성자**: 기본값 "이승욱"
   - **발행일**: 자동 설정됨
4. "Publish" 버튼 클릭하여 발행

### 블로그 글 확인

- 웹사이트의 `/blog` 경로에서 발행된 글 확인
- Sanity Studio에서 작성한 글이 자동으로 표시됩니다

## 🔐 인증 정보

Sanity Studio는 Sanity.io의 자체 인증 시스템을 사용합니다:

- **로그인**: Sanity.io 계정으로 로그인
- **사용자 초대**: [sanity.io/manage](https://www.sanity.io/manage)에서 프로젝트 선택 > Members > Invite member

## 🐛 문제 해결

### "Project ID not found" 오류
- `sanity-studio/.env.local` 파일이 올바른 위치에 있는지 확인
- Project ID가 `hlql019b`로 설정되어 있는지 확인

### CORS 오류
- Sanity 대시보드에서 API 설정 확인:
  1. [sanity.io/manage](https://www.sanity.io/manage) 접속
  2. 프로젝트 선택
  3. API > CORS origins에서 `http://localhost:5173` 추가

### 데이터가 표시되지 않음
- Sanity Studio에서 블로그 포스트가 "Published" 상태인지 확인
- 브라우저 콘솔(F12)에서 오류 메시지 확인

## 📚 추가 정보

자세한 설정 방법은 `SANITY_SETUP.md` 파일을 참고하세요.


