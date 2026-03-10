# 작업 로그 (Work Log)

## 2025년 1월 21일

### 메인페이지 콘텐츠 대폭 수정

#### 1. "아파야 보입니다." 섹션으로 전면 교체
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - 기존 "저도 환자였습니다." 및 "직접 연구하고 고쳐봤습니다." 섹션을 완전히 새로운 내용으로 교체
  - 제목: "아파야 보입니다." (기존 "저도 환자였습니다."와 동일한 스타일 유지)
  - 새로운 내용:
    - 내분비질환과 신장질환을 진료하며 전문의 과정을 밟았고,
    - 같은 분야를 공부하여 임상한의학 박사 학위도 받았습니다.
    - 한의내과학 중 체액의 조성과 대사를 다루는 부분은 현대의 호르몬 및 신장과 연결되어 있습니다.
    - 그러던 중 가족이 재발하는 갑상선 질환으로 고생하는 모습을 옆에서 지켜보았고,
    - 직접 연구하고 고치며 답을 찾았습니다.
  - "그러던 중" 단락과 윗 단락 사이에 여백 추가 (`mt-8` 클래스)

#### 2. 전문 과정 섹션 문장 수정
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - "경희대학교 한의학과를 졸업하고 한방 내과 전문의 과정과 임상 한의학 박사 과정을 수료하였으며, 졸업 후 10년간 5,000건 이상의 풍부한 치료경험이 있습니다."
  - → "경희대학교 한의학과를 졸업하고 한방 내과 전문의 과정과 임상 한의학 박사 과정을 수료하였으며, 졸업 후 10년간 수만건 이상의 풍부한 임상경험을 축적했습니다. 이 경험들이 환자분의 건강에 보탬이 되면 좋겠습니다."

#### 3. 생약 치료 섹션 문장 추가
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - "적응제(Adaptogen)로 작용하는 생약성분을 이용하여 면역 계통을 안정화하고 자극제(Stimulant)로 작용하는 생약성분을 이용하여 해로운 면역 물질을 제거합니다."
  - → "적응제(Adaptogen)로 작용하는 생약성분을 이용하여 면역 계통을 안정화하고 자극제(Stimulant)로 작용하는 생약성분을 이용하여 해로운 면역 물질을 제거합니다. 체계적인 생약 치료로 질환 때문에 환자분이 손해보지 않도록 돕겠습니다."

#### 4. 진단법 섹션 문장 대폭 수정
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - "고유 진단법으로 머리 끝에서 발 끝까지 몸이 보내는 신호를 읽고, 자율신경검사, 혈액검사, 초음파검사 등 과학적인 검사를 더해 진료합니다."
  - → "고유 진단법으로 머리 끝에서 발 끝까지 몸이 보내는 신호를 읽습니다. 외부 자극에 내 몸이 어떻게 반응하는지 확인하지 않으면 값비싼 검사도 죽은 검사가 됩니다. 자율신경검사, 혈액검사, 초음파검사 등의 과학적인 검사에 신체 반응에 기반한 진단을 더합니다."

### 수정된 파일 목록
1. `frontend/src/pages/Home.tsx` - 메인페이지 콘텐츠 전면 수정

---

## 2025년 1월 20일 (저녁 추가)

### 홈페이지 콘텐츠 및 레이아웃 수정

#### 1. 인사말 섹션 텍스트 변경
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - "면역으로 몸을 치료하는 이승욱 대표원장입니다. 오랜시간 고생했지만 해결되지 않는 증상으로 답답하시죠? 혼자 고민하지 마세요. 함께 행복하고 건강한 삶을 찾아드리겠습니다."
  - → "갑상선을 치료하는 이승욱 대표원장입니다."로 간소화

#### 2. 섹션 제목 및 내용 수정
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - "스스로 고쳐봤습니다." → "직접 연구하고 고쳐봤습니다."

#### 3. 섹션 통합
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - "저도 환자였습니다." 섹션과 "직접 연구하고 고쳐봤습니다." 섹션을 하나의 섹션으로 통합
  - 버튼 텍스트 변경: "이승욱 대표원장님 스토리가 궁금하다면?" → "이승욱 대표원장님이 궁금하다면?"

#### 4. 클리닉 섹션 제목 및 레이아웃 변경
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - 제목 변경: "어떤 고통으로 찾아오셨나요?" → "더 자세한 이야기가 궁금하다면?"
  - 레이아웃 변경: `grid md:grid-cols-2` → `flex flex-col`로 변경하여 클리닉을 세로로 배치
    - 갑상선 클리닉이 위에, 면역 클리닉이 아래에 배치

#### 5. 섹션 제목 삭제
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - "결국 답을 찾았습니다." 텍스트 삭제

### 수정된 파일 목록
1. `frontend/src/pages/Home.tsx` - 인사말, 섹션 통합, 클리닉 레이아웃 변경

---

## 2025년 1월 20일 (저녁)

### 클리닉 정리 - 2개로 축소

#### 1. 클리닉 목록 축소
- **파일**: `frontend/src/pages/Home.tsx`, `frontend/src/pages/Clinics.tsx`
- **변경 내용**:
  - 기존 3개 클리닉 (갑상선, 두드러기, 염증성 장질환) → 2개 클리닉으로 축소
  - **갑상선 클리닉** (유지)
  - **면역 클리닉** (기존 '코어 면역 치료'에서 변경)
  - 두드러기 클리닉, 염증성 장질환 클리닉 제거
  - 메인 페이지 그리드를 `md:grid-cols-3`에서 `md:grid-cols-2`로 변경

#### 2. 라우트 정리
- **파일**: `frontend/src/App.tsx`
- **변경 내용**:
  - `/clinics/urticaria` 라우트 제거
  - `/clinics/ibd` 라우트 제거
  - `/clinics/immunity` 라우트 추가 (기존 `/clinics/core-immunity` 대체)
  - 불필요한 import 제거 (`ClinicUrticaria`, `ClinicIBD`)

#### 3. 면역 클리닉 페이지 제목 변경
- **파일**: `frontend/src/pages/ClinicCoreImmunity.tsx`
- **변경 내용**:
  - "코어 면역 치료" → "면역 클리닉"으로 제목 변경

#### 4. Sitemap 업데이트
- **파일**: `frontend/app/sitemap.ts`
- **변경 내용**:
  - 두드러기, IBD 클리닉 URL 제거
  - 면역 클리닉 URL (`/clinics/immunity`) 추가

### 수정된 파일 목록
1. `frontend/src/pages/Home.tsx` - 클리닉 목록 2개로 축소
2. `frontend/src/pages/Clinics.tsx` - 클리닉 목록 2개로 축소
3. `frontend/src/App.tsx` - 라우트 정리
4. `frontend/src/pages/ClinicCoreImmunity.tsx` - 제목 변경
5. `frontend/app/sitemap.ts` - 클리닉 URL 업데이트

---

## 2025년 1월 20일 (오후)

### Next.js App Router 블로그 포스트 페이지 및 SEO 최적화

#### 1. 블로그 포스트 페이지 생성
- **파일**: `frontend/app/blog/[slug]/page.tsx`
- **기능**:
  - Sanity CMS에서 블로그 포스트 데이터 가져오기
  - Portable Text를 사용한 리치 텍스트 콘텐츠 렌더링
  - 이미지 최적화 및 반응형 처리

#### 2. 동적 SEO 메타데이터 생성 (`generateMetadata`)
- **파일**: `frontend/app/blog/[slug]/page.tsx`
- **기능**:
  - **title**: Sanity에서 가져온 글 제목
  - **description**: Sanity에서 가져온 글 요약(excerpt)
  - **author**: '한의사 이승욱'으로 고정
  - **Open Graph 이미지**: Sanity의 대표 이미지를 1200x630 크기로 최적화
  - **Twitter Card**: summary_large_image 타입 지원
  - **Canonical URL**: SEO를 위한 정규 URL 설정

#### 3. JSON-LD 구조화된 데이터 추가
- **파일**: `frontend/app/blog/[slug]/page.tsx`
- **스키마**: Schema.org MedicalWebPage 타입
- **구성**:
  - `@type: "MedicalWebPage"`
  - `author`: Physician 타입 (이승욱, 한의사)
  - `audience`: Patient 타입 (Patients)
  - Sanity 데이터 매핑 (제목, 날짜, 이미지, URL)
  - 출판사 정보 (경희늘품한의원)

#### 4. Sitemap 생성
- **파일**: `frontend/app/sitemap.ts`
- **기능**:
  - Sanity에서 모든 블로그 포스트의 slug와 수정 날짜 가져오기
  - 구글 sitemap XML 형식으로 자동 생성
  - 기본 URL은 환경 변수로 설정 가능
  - 정적 페이지와 동적 블로그 포스트 URL 모두 포함

#### 5. 404 페이지 생성
- **파일**: `frontend/app/blog/[slug]/not-found.tsx`
- **기능**: 포스트를 찾을 수 없을 때 표시되는 커스텀 404 페이지

#### 6. 환경 설정
- **파일**: `frontend/.env.local`
- **내용**:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=hlql019b`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
  - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

#### 7. 패키지 설치
- 설치된 패키지:
  - `@sanity/client`
  - `@sanity/image-url`
  - `@portabletext/react`

### 수정된 파일 목록
1. `frontend/app/blog/[slug]/page.tsx` - 신규 생성 (블로그 포스트 페이지 및 SEO 메타데이터)
2. `frontend/app/blog/[slug]/not-found.tsx` - 신규 생성 (404 페이지)
3. `frontend/app/blog/[slug]/README.md` - 신규 생성 (문서화)
4. `frontend/app/sitemap.ts` - 신규 생성 (동적 sitemap)
5. `frontend/.env.local` - 신규 생성 (환경 변수)

---

## 2025년 1월 20일 (추가)

### Next.js App Router 블로그 포스트 페이지 생성

#### 1. 동적 SEO 메타데이터 생성
- **파일**: `frontend/app/blog/[slug]/page.tsx`
- **변경 내용**:
  - `generateMetadata` 함수 구현
  - **title**: Sanity에서 가져온 글 제목으로 설정
  - **description**: Sanity에서 가져온 글 요약(excerpt)으로 설정
  - **author**: '한의사 이승욱'으로 고정
  - **Open Graph 이미지**: Sanity의 대표 이미지(mainImage)를 1200x630 크기로 최적화하여 카카오톡/SNS 공유 시 썸네일 표시
  - **Twitter Card**: summary_large_image 타입 지원
  - **Canonical URL**: SEO를 위한 정규 URL 설정

#### 2. 블로그 포스트 페이지 구현
- **파일**: `frontend/app/blog/[slug]/page.tsx`
- **기능**:
  - Sanity CMS에서 블로그 포스트 데이터 가져오기
  - Portable Text를 사용한 리치 텍스트 콘텐츠 렌더링
  - 이미지 최적화 및 반응형 처리
  - 작성자 정보 '한의사 이승욱'으로 고정 표시

#### 3. 404 페이지 생성
- **파일**: `frontend/app/blog/[slug]/not-found.tsx`
- **기능**: 포스트를 찾을 수 없을 때 표시되는 커스텀 404 페이지

#### 4. 문서화
- **파일**: `frontend/app/blog/[slug]/README.md`
- **내용**: 사용 방법, 필요한 패키지, 환경 변수 설정 가이드

### 필요한 패키지
```bash
npm install @sanity/client @sanity/image-url @portabletext/react
```

### 환경 변수 설정
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 수정된 파일 목록
1. `frontend/app/blog/[slug]/page.tsx` - 신규 생성 (블로그 포스트 페이지 및 SEO 메타데이터)
2. `frontend/app/blog/[slug]/not-found.tsx` - 신규 생성 (404 페이지)
3. `frontend/app/blog/[slug]/README.md` - 신규 생성 (문서화)

---

## 2025년 1월 20일

### 주요 변경 사항

#### 1. 색상 테마 변경
- **파일**: `frontend/tailwind.config.ts`, 모든 컴포넌트 파일
- **변경 내용**:
  - Primary 색상: `#006241` → `#1A3C34` (Deep forest green)
  - Primary 색상 팔레트 전체 업데이트
  - 크림화이트 색상 추가: `#F5F5F0`
  - 모든 `bg-white`, `bg-slate-50` → `bg-cream-white`로 변경
  - 박스 섀도우 색상 업데이트

#### 2. 메인 페이지 이미지 변경
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - 이미지 경로: `home1.jpg`, `home2.jpg`, `home3.jpg` → `main1.jpg`, `main2.JPG`, `main3.jpg`
  - `main2.JPG` 대소문자 처리 추가

#### 3. 메인 페이지 텍스트 수정
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - "면역 질환을 치료하는" → "면역으로 몸을 치료하는"
  - "갖은 노력을 다 해봤지만" → "오랜시간 고생했지만"
  - "저도 병원을 다녀도 낫지 않는 면역성 장질환으로 오래 고생했습니다. 제 어머니는 갑상선 문제로 고생했고, 제 딸은 두드러기로 고생했습니다." → "저와 제 가족도 면역계통의 문제로 인해 낫지 않는 질환으로 오래 고생했습니다."
  - "모두 면역이 문제였습니다." → "갑상선 질환, 두드러기, 과민성 장질환 모두 면역이 문제였습니다."
  - "그래서 직접 연구하여 고치기로 다짐했습니다. 100가지 이상의 처방과 치료법을 시도했습니다. 논문으로 연구된 치료를 몸소 검증하고 주위에 적용하면서 증상이 개선됨을 반복해서 확인했습니다." → 3줄로 분리
  - "마침내 답을 찾았습니다." → "결국 답을 찾았습니다."
  - "우리 몸은 아프다고 조직의 압력 변화, 혈색과 맥압의 변화, 신체 반응의 변화 등을 통해 알려줍니다." 문장 제거
  - "자율신경검사, 혈액검사 등 과학적인 검사에 더해 머리 끝에서 발 끝까지 몸이 보내는 신호를 읽고 치료합니다." → "고유 진단법으로 머리 끝에서 발 끝까지 몸이 보내는 신호를 읽고, 자율신경검사, 혈액검사, 초음파검사 등 과학적인 검사를 더해 진료합니다."

#### 4. 메인 페이지 섹션 제목 제거
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - "WHY" 제목 제거
  - 첫 번째 "HOW" 제목 제거
  - 두 번째 "HOW" 제목 제거

#### 5. 하단 네비게이션 텍스트 변경
- **파일**: `frontend/src/components/Footer.tsx`
- **변경 내용**:
  - "전문성 있는 면역치료로 건강을 회복합니다." → "다시 회복, 전문성 있는 치료를 제공합니다."

#### 6. 클리닉 페이지 레이아웃 변경
- **파일**: `frontend/src/pages/Clinics.tsx`, `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - 코어 면역 치료 탭 제거
  - 메인 페이지: 3개 클리닉을 동일 높이에 한 줄로 배치 (`md:grid-cols-3`)
  - 클리닉 페이지: 3개 클리닉을 세로로 하나씩 나열 (`flex flex-col`)

### 수정된 파일 목록
1. `frontend/tailwind.config.ts` - 색상 테마 업데이트
2. `frontend/src/App.tsx` - 배경색 변경
3. `frontend/src/pages/Home.tsx` - 텍스트 및 레이아웃 수정
4. `frontend/src/pages/Clinics.tsx` - 레이아웃 변경
5. `frontend/src/components/Footer.tsx` - 텍스트 변경
6. `frontend/src/components/NavBar.tsx` - 배경색 변경
7. `frontend/src/components/SectionCard.tsx` - 배경색 변경
8. `frontend/src/pages/Blog.tsx` - 배경색 변경
9. `frontend/src/pages/Reviews.tsx` - 배경색 변경
10. `frontend/src/pages/DoctorProfile.tsx` - 배경색 변경
11. `frontend/src/pages/AdminDashboard.tsx` - 배경색 변경
12. `frontend/src/pages/AdminBlogEditor.tsx` - 배경색 변경
13. `frontend/src/pages/SanityAdmin.tsx` - 배경색 변경
14. `frontend/src/pages/BlogSanity.tsx` - 배경색 변경

---

## 2025년 1월 14일

### 주요 변경 사항

#### 1. 메인 페이지 WHY 섹션 텍스트 수정
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - "저도 병원을 다녀도 낫지 않는 면역 질환으로 오래 고생했습니다." → "저도 병원을 다녀도 낫지 않는 면역성 장질환으로 오래 고생했습니다."
  - "제 아내는 자가면역성 관절염이 있었고, 어머니는 갑상선 문제가 있었습니다." → "제 어머니는 갑상선 문제로 고생했고, 제 딸은 두드러기로 고생했습니다."
  - "모두 면역이 문제였습니다." (유지)

#### 2. 하단 네비게이션(Footer) 문구 변경
- **파일**: `frontend/src/components/Footer.tsx`
- **변경 내용**:
  - "전문성 있는 치료로 건강을 회복합니다." → "전문성 있는 면역치료로 건강을 회복합니다."

#### 3. 클리닉 탭 4개로 확장
- **파일**: `frontend/src/pages/Clinics.tsx`, `frontend/src/pages/Home.tsx`, `frontend/src/App.tsx`
- **변경 내용**:
  - 기존 2개 클리닉에서 4개로 확장:
    1. 갑상선 클리닉
    2. 두드러기 클리닉 (신규)
    3. 염증성 장질환 클리닉 (신규)
    4. 코어 면역 치료
  - 클리닉 목록 페이지에서 제목만 표시하도록 변경 (상세 내용 제거)
  - 메인 페이지의 클리닉 섹션도 4개로 업데이트

#### 4. 새로운 클리닉 페이지 생성
- **파일**: 
  - `frontend/src/pages/ClinicUrticaria.tsx` (신규)
  - `frontend/src/pages/ClinicIBD.tsx` (신규)
- **라우트 추가**:
  - `/clinics/urticaria` - 두드러기 클리닉
  - `/clinics/ibd` - 염증성 장질환 클리닉

#### 5. 메인 페이지 이미지 적용 및 크기 조정
- **파일**: `frontend/src/pages/Home.tsx`
- **변경 내용**:
  - 첫번째 특별함 섹션의 플레이스홀더를 실제 이미지로 교체
  - 이미지 경로: `/images/home/home1.jpg` (또는 `.png`)
  - 모든 이미지 크기를 반으로 축소 (`w-full` → `w-1/2`)
  - 이미지 중앙 정렬 (`mx-auto` 추가)

#### 6. 백엔드 서버 안정화
- **파일**: `docker-compose.dev.yml`
- **변경 내용**:
  - 백엔드 컨테이너 시작 시 자동으로 `npm install` 실행하도록 `command` 추가
  - `tsx` 패키지 문제 해결로 백엔드 서버 정상 작동

### 수정된 파일 목록

1. `frontend/src/pages/Home.tsx` - WHY 섹션 텍스트, 클리닉 섹션, 이미지 크기 조정
2. `frontend/src/components/Footer.tsx` - 하단 문구 변경
3. `frontend/src/pages/Clinics.tsx` - 클리닉 4개로 확장, 제목만 표시
4. `frontend/src/pages/ClinicUrticaria.tsx` - 신규 생성
5. `frontend/src/pages/ClinicIBD.tsx` - 신규 생성
6. `frontend/src/App.tsx` - 새로운 클리닉 라우트 추가
7. `docker-compose.dev.yml` - 백엔드 자동 npm install 추가

### 서버 상태

- **프론트엔드**: http://localhost:3000 (정상 작동)
- **백엔드**: http://localhost:5000 (정상 작동)
- **Sanity Studio**: http://localhost:3333 (정상 작동)

### 관리자 로그인 정보

- 아이디: `admin`
- 비밀번호: `admin123`

---

## 2025년 1월 (메인 페이지 리뉴얼)

### 주요 변경 사항

#### 1. 메인 페이지 전체 리디자인
- 기존 메인 페이지를 스크린샷 참고하여 완전히 새로 디자인
- 백업 파일: `frontend/src/pages/Home.backup.tsx`에 기존 버전 저장

#### 2. 섹션 구성

##### 인사말 섹션
- "면역 질환을 치료하는 이승욱 대표원장입니다."
- "갖은 노력을 다 해봤지만 해결되지 않는 증상으로 답답하시죠?"
- "혼자 고민하지 마세요. 함께 행복하고 건강한 삶을 찾아드리겠습니다."

##### WHY 섹션
- 제목: "저도 환자였습니다."
- 내용:
  - 저도 병원을 다녀도 낫지 않는 면역 질환으로 오래 고생했습니다.
  - 제 아내는 자가면역성 관절염이 있었고, 어머니는 갑상선 문제가 있었습니다.
  - 모두 면역이 문제였습니다.

##### HOW 섹션 (스스로 고쳐봤습니다)
- 제목: "스스로 고쳐봤습니다."
- 내용: "그래서 직접 연구하여 고치기로 다짐했습니다. 100가지 이상의 처방과 치료법을 시도했습니다. 논문으로 연구된 치료를 몸소 검증하고 주위에 적용하면서 증상이 개선됨을 반복해서 확인했습니다."

##### HOW 섹션 (마침내 답을 찾았습니다)
- 제목: "마침내 답을 찾았습니다."

###### 첫번째 특별함
- 제목: "전문 과정을 착실히 수료했습니다."
- 내용: "경희대학교 한의학과를 졸업하고 한방 내과 전문의 과정과 임상 한의학 박사 과정을 수료하였으며, 졸업 후 10년간 5,000건 이상의 풍부한 치료경험이 있습니다."

###### 두번째 특별함
- 제목: "과학적으로 접근하는 생약 치료."
- 내용: "적응제(Adaptogen)로 작용하는 생약성분을 이용하여 면역 계통을 안정화하고 자극제(Stimulant)로 작용하는 생약성분을 이용하여 해로운 면역 물질을 제거합니다."

###### 세번째 특별함
- 제목: "우리 몸이 보내는 신호를 읽습니다."
- 내용:
  - "자율신경검사, 혈액검사 등 과학적인 검사에 더해 머리 끝에서 발 끝까지 몸이 보내는 신호를 읽고 치료합니다."
  - "우리 몸은 아프다고 조직의 압력 변화, 혈색과 맥압의 변화, 신체 반응의 변화 등을 통해 알려줍니다."

##### 클리닉 섹션 (어떤 고통으로 찾아오셨나요?)
- Clinics 탭의 내용을 메인 페이지에 통합
- 갑상선 클리닉
- 코어 면역 치료
- 각 클리닉 카드는 상세 페이지로 링크

#### 3. 제거된 섹션
- 리뷰/평점 섹션 (네이버 리뷰 350건, 4.8점)
- 네번째 특별함 섹션 (다양한 치료 옵션)

#### 4. 이미지 플레이스홀더
다음 이미지들이 추가될 예정:
- `/images/home/engineering-medicine.jpg` - 공학과 한의학 조합 이미지
- `/images/home/treatment-experience.jpg` - 치료 경험 이미지
- `/images/home/medical-equipment.jpg` - 검사 장비 이미지

#### 5. 기타 수정 사항
- `frontend/src/pages/Clinics.tsx`: "Adaptogen 기반" → "적응제(Adaptogen) 기반"으로 변경
- 반응형 디자인 적용 (모바일/태블릿/데스크톱)
- 기존 컬러 팔레트 유지 (primary 색상: #006241)

### 수정된 파일 목록
1. `frontend/src/pages/Home.tsx` - 메인 페이지 완전 재작성
2. `frontend/src/pages/Home.backup.tsx` - 기존 버전 백업
3. `frontend/src/pages/Clinics.tsx` - Adaptogen 텍스트 수정

### 참고사항
- 모든 변경사항은 반응형으로 작성되어 모바일에서도 잘 보입니다.
- 기존 헤더(네비게이션)와 하단 배너는 그대로 유지되었습니다.
- Vite의 핫 리로드로 개발 중 자동 반영됩니다.

---

## 서버 정보

### 기본 정보
- **프론트엔드**: http://localhost:3000
- **백엔드**: http://localhost:5000
- **Sanity Studio**: http://localhost:3333

### 관리자 로그인
- 아이디: `admin`
- 비밀번호: `admin123`
