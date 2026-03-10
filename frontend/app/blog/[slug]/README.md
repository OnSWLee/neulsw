# 블로그 포스트 페이지 - Next.js App Router

## 개요

이 디렉토리는 Next.js App Router를 사용한 블로그 포스트 동적 라우트 페이지입니다.

## 파일 구조

- `page.tsx`: 블로그 포스트 상세 페이지 컴포넌트 및 `generateMetadata` 함수
- `not-found.tsx`: 404 페이지 (포스트를 찾을 수 없을 때)

## 주요 기능

### 1. 동적 SEO 메타데이터 생성 (`generateMetadata`)

- **title**: Sanity에서 가져온 글 제목
- **description**: Sanity에서 가져온 글 요약 (excerpt)
- **author**: '한의사 이승욱'으로 고정
- **Open Graph 이미지**: Sanity의 대표 이미지 (mainImage)를 1200x630 크기로 최적화
- **Twitter Card**: summary_large_image 타입 지원
- **Canonical URL**: SEO를 위한 정규 URL 설정

### 2. Sanity 데이터 연동

- Sanity CMS에서 블로그 포스트 데이터를 가져옴
- Portable Text를 사용하여 리치 텍스트 콘텐츠 렌더링
- 이미지 최적화 및 반응형 처리

## 필요한 패키지

Next.js 프로젝트에서 다음 패키지를 설치해야 합니다:

```bash
npm install @sanity/client @sanity/image-url @portabletext/react
```

## 환경 변수

`.env.local` 파일에 다음 환경 변수를 설정하세요:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 사용 방법

1. Sanity Studio에서 블로그 포스트를 작성
2. 각 포스트는 고유한 `slug`를 가짐
3. `/blog/[slug]` 경로로 접근하면 해당 포스트가 표시됨
4. 카카오톡이나 SNS 공유 시 OG 이미지가 자동으로 표시됨

## SEO 최적화

- 각 포스트마다 동적으로 메타데이터 생성
- Open Graph 태그로 SNS 공유 최적화
- Twitter Card 지원
- Canonical URL 설정으로 중복 콘텐츠 방지







