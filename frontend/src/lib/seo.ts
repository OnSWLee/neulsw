import { SITE, absoluteUrl, openingHoursJsonLd } from "./site";

export type FaqItem = { question: string; answer: string };

export const HOME_FAQS: FaqItem[] = [
  {
    question: "경희늘품한의원은 어디에 있나요?",
    answer:
      "경희늘품한의원은 경기도 수원시 권선구 동수원로 242번길 6에 있습니다. 전화 상담은 031-224-1191로 가능합니다.",
  },
  {
    question: "진료시간은 어떻게 되나요?",
    answer:
      "평일은 오전 9시부터 저녁 8시까지 진료하며, 점심시간은 오후 1시부터 2시입니다. 토요일은 오전 9시부터 오후 2시까지 점심시간 없이 진료합니다. 일요일과 공휴일은 휴진입니다.",
  },
  {
    question: "경희늘품한의원 대표원장은 누구인가요?",
    answer:
      "대표원장은 이승욱 한의사입니다. 경희대학교 한의과대학을 졸업하고 경희의료원 한방내과 전문의 수련과 임상한의학 박사과정을 수료했으며, 생약·근골격계 초음파 진료를 전문으로 합니다.",
  },
  {
    question: "어떤 클리닉이 있나요?",
    answer:
      "생약 클리닉과 척추관절 클리닉을 운영합니다. 생약 클리닉은 만성·면역 관련 회복을, 척추관절 클리닉은 초음파 유도 약침으로 통증 원인 치료를 다룹니다.",
  },
  {
    question: "생약 치료는 무엇인가요?",
    answer:
      "생약은 여러 유효 성분이 함께 작용하는 천연 복합 치료입니다. 증상만 억누르기보다 몸의 회복 시스템이 다시 작동하도록 돕는 것을 목표로 합니다.",
  },
  {
    question: "초음파 유도 약침은 어떤 치료인가요?",
    answer:
      "고해상도 초음파로 통증 원인을 확인한 뒤, 침과 약침을 실시간으로 유도해 심부 조직까지 정확하게 치료하는 방법입니다. 스테로이드를 사용하지 않는 도담약침을 활용합니다.",
  },
];

export const DOCTOR_FAQS: FaqItem[] = [
  {
    question: "이승욱 원장의 주요 경력은 무엇인가요?",
    answer:
      "경희대학교 한의과대학 졸업, 경희의료원 한방내과 전문의, 경희의료원 한방내분비센터 재직, 임상한의학 박사, 미국 근골격계 초음파 인증(RMSK), 하버드의과대학 연수, 경희늘품한의원 대표원장 및 경희대학교 외래실습 책임교수 경력이 있습니다.",
  },
  {
    question: "진료 철학은 무엇인가요?",
    answer:
      "체계적인 진료와 공부를 바탕으로, 생약 전문가로서 면역 불균형과 만성 염증의 근본 원인을 다루는 치료를 지향합니다. 임상 데이터를 공유해 환자가 근거 있는 선택을 하도록 돕습니다.",
  },
];

export const HERBAL_FAQS: FaqItem[] = [
  {
    question: "생약 클리닉은 어떤 분에게 맞나요?",
    answer:
      "쉽게 회복되지 않는 만성 질환, 면역·염증 관련 문제로 근본적인 회복을 원하는 분에게 적합합니다. 개인 상태에 따라 진료 후 치료 방향을 결정합니다.",
  },
  {
    question: "생약과 합성 의약품의 차이는 무엇인가요?",
    answer:
      "단일 합성 의약품이 특정 수치를 빠르게 바꾸는 데 초점을 두는 경우가 많은 반면, 생약은 여러 경로를 함께 조절해 몸이 스스로 균형을 찾도록 돕는 데 중점을 둡니다.",
  },
];

export const SPINE_FAQS: FaqItem[] = [
  {
    question: "척추관절 클리닉에서는 무엇을 치료하나요?",
    answer:
      "척추·관절 통증을 대상으로, 초음파로 원인을 확인한 뒤 도담약침 등 초음파 유도 약침으로 신경 압박 완화와 조직 회복을 돕습니다.",
  },
  {
    question: "초음파 유도 약침의 장점은 무엇인가요?",
    answer:
      "심부 조직과 혈관·신경이 많은 부위를 보면서 치료해 정확도를 높입니다. 스테로이드를 쓰지 않는 약침으로 부작용 부담을 줄이면서 통증 원인에 접근합니다.",
  },
];

export function medicalClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE.url}/#clinic`,
    name: SITE.name,
    alternateName: "늘품한의원",
    url: SITE.url,
    telephone: SITE.phoneTel,
    image: absoluteUrl(SITE.defaultOgImage),
    description: SITE.defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      addressCountry: SITE.address.addressCountry,
    },
    openingHoursSpecification: openingHoursJsonLd(),
    openingHours: ["Mo-Fr 09:00-13:00,14:00-20:00", "Sa 09:00-14:00", "Su closed", "PH closed"],
    medicalSpecialty: ["Acupuncture", "TraditionalChineseMedicine"],
    availableService: SITE.clinics.map((c) => ({
      "@type": "MedicalTherapy",
      name: c.name,
      url: absoluteUrl(c.path),
      description: c.description,
    })),
    employee: {
      "@id": `${SITE.url}/doctor#physician`,
    },
  };
}

export function physicianJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE.url}/doctor#physician`,
    name: SITE.doctor.name,
    jobTitle: SITE.doctor.jobTitle,
    url: absoluteUrl("/doctor"),
    image: absoluteUrl(SITE.defaultOgImage),
    worksFor: {
      "@id": `${SITE.url}/#clinic`,
      "@type": "MedicalClinic",
      name: SITE.name,
    },
    alumniOf: SITE.doctor.alumniOf.map((name) => ({
      "@type": "CollegeOrUniversity",
      name,
    })),
    medicalSpecialty: ["Acupuncture", "TraditionalChineseMedicine"],
    description:
      "경희대학교 한의과대학 졸업, 경희의료원 한방내과 전문의, 임상한의학 박사. 경희늘품한의원 대표원장.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "ko-KR",
    publisher: { "@id": `${SITE.url}/#clinic` },
  };
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
