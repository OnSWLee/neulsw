# Sanity CMS 설정 가이드

이 가이드는 프로젝트에 Sanity CMS를 연결하고 블로그 관리 기능을 설정하는 방법을 설명합니다.

## 1. Sanity 계정 생성 및 프로젝트 설정

### 1.1 Sanity 계정 생성
1. [sanity.io](https://www.sanity.io)에 접속하여 계정을 생성합니다.
2. 로그인 후 "Create new project"를 클릭합니다.

### 1.2 프로젝트 생성
- **Project name**: `kyunghee-blog` (또는 원하는 이름)
- **Dataset name**: `production` (기본값 사용)
- **Plan**: Free tier 선택

### 1.3 Project ID 확인
프로젝트 생성 후, 프로젝트 대시보드에서 **Project ID**를 복사합니다.
이 ID는 나중에 환경 변수에 사용됩니다.

## 2. Sanity Studio 설치 및 설정

### 2.1 의존성 설치

프로젝트 루트에서 다음 명령어를 실행합니다:

```bash
cd sanity-studio
npm install
```

### 2.2 환경 변수 설정

`sanity-studio` 폴더에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
SANITY_STUDIO_PROJECT_ID=your-project-id-here
SANITY_STUDIO_DATASET=production
```

**중요**: `your-project-id-here`를 1.3에서 복사한 실제 Project ID로 교체하세요.

### 2.3 Sanity Studio 실행

```bash
cd sanity-studio
npm run dev
```

Sanity Studio가 `http://localhost:3333`에서 실행됩니다.

## 3. 프론트엔드 설정

### 3.1 의존성 설치

```bash
cd frontend
npm install
```

### 3.2 환경 변수 설정

`frontend` 폴더에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
VITE_SANITY_PROJECT_ID=your-project-id-here
VITE_SANITY_DATASET=production
VITE_SANITY_STUDIO_URL=http://localhost:3333
```

**중요**: `your-project-id-here`를 실제 Project ID로 교체하세요.

### 3.3 Sanity 클라이언트 설정 확인

`frontend/src/lib/sanity.ts` 파일이 올바르게 설정되어 있는지 확인하세요.

## 4. Sanity 인증 설정

### 4.1 Sanity Studio 인증

Sanity Studio는 자체 인증 시스템을 사용합니다:

1. **처음 접속 시**: Sanity 계정으로 로그인하라는 메시지가 표시됩니다.
2. **로그인**: Sanity.io 계정의 이메일과 비밀번호로 로그인합니다.
3. **권한 관리**: 
   - 프로젝트 소유자는 모든 권한을 가집니다.
   - 다른 사용자를 초대하려면 Sanity 대시보드에서 "Invite" 기능을 사용하세요.

### 4.2 사용자 초대 방법

1. [sanity.io/manage](https://www.sanity.io/manage)에 접속합니다.
2. 프로젝트를 선택합니다.
3. "Members" 탭으로 이동합니다.
4. "Invite member" 버튼을 클릭합니다.
5. 초대할 사용자의 이메일을 입력하고 역할을 선택합니다:
   - **Administrator**: 모든 권한
   - **Editor**: 콘텐츠 작성 및 수정
   - **Viewer**: 읽기 전용

### 4.3 프로젝트별 인증 (선택사항)

프로젝트별 인증을 설정하려면:

1. Sanity 대시보드에서 프로젝트 설정으로 이동합니다.
2. "API" > "CORS origins"에서 허용할 도메인을 추가합니다.
3. "API" > "Tokens"에서 API 토큰을 생성할 수 있습니다 (읽기 전용 또는 읽기/쓰기).

## 5. 사용 방법

### 5.1 관리자 페이지 접속

1. 웹사이트에서 `/admin` 경로로 접속합니다.
2. 자동으로 Sanity Studio (`http://localhost:3333`)로 리다이렉트됩니다.
3. Sanity 계정으로 로그인합니다.

### 5.2 블로그 글 작성

1. Sanity Studio에서 "블로그 포스트" 문서 타입을 선택합니다.
2. "Create new" 버튼을 클릭합니다.
3. 다음 필드를 작성합니다:
   - **제목**: 블로그 글 제목
   - **슬러그**: URL에 사용될 고유 식별자 (자동 생성 가능)
   - **요약**: 블로그 글 요약 (최대 200자)
   - **내용**: 블로그 글 본문 (리치 텍스트 에디터)
   - **메인 이미지**: 블로그 글 대표 이미지
   - **작성자**: 작성자 이름 (기본값: "이승욱")
   - **발행일**: 발행 날짜 및 시간
4. "Publish" 버튼을 클릭하여 발행합니다.

### 5.3 블로그 글 수정

1. Sanity Studio에서 수정할 블로그 포스트를 선택합니다.
2. 내용을 수정합니다.
3. "Publish" 버튼을 클릭하여 변경사항을 저장합니다.

### 5.4 블로그 글 삭제

1. Sanity Studio에서 삭제할 블로그 포스트를 선택합니다.
2. 문서 옵션 메뉴에서 "Delete"를 선택합니다.
3. 확인 메시지에서 "Delete"를 클릭합니다.

## 6. 프로덕션 배포

### 6.1 Sanity Studio 배포

Sanity Studio를 배포하는 방법:

```bash
cd sanity-studio
npm run build
npm run deploy
```

또는 Vercel, Netlify 등에 배포할 수 있습니다.

### 6.2 환경 변수 설정 (프로덕션)

프로덕션 환경에서는 다음 환경 변수를 설정하세요:

- `VITE_SANITY_PROJECT_ID`: Sanity 프로젝트 ID
- `VITE_SANITY_DATASET`: 데이터셋 이름 (보통 "production")
- `VITE_SANITY_STUDIO_URL`: 배포된 Sanity Studio URL

## 7. 문제 해결

### 7.1 "Project ID not found" 오류

- `.env.local` 파일에 올바른 Project ID가 설정되어 있는지 확인하세요.
- 환경 변수 파일을 저장한 후 서버를 재시작하세요.

### 7.2 "CORS" 오류

- Sanity 대시보드에서 "API" > "CORS origins"에 프론트엔드 도메인을 추가하세요.

### 7.3 데이터가 표시되지 않음

- Sanity Studio에서 블로그 포스트가 "Published" 상태인지 확인하세요.
- 브라우저 콘솔에서 오류 메시지를 확인하세요.

## 8. 추가 리소스

- [Sanity 공식 문서](https://www.sanity.io/docs)
- [Sanity Studio 가이드](https://www.sanity.io/docs/studio)
- [GROQ 쿼리 언어](https://www.sanity.io/docs/groq)


