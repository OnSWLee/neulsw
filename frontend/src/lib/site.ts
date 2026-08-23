/** 사이트 공통 정보 — SEO / GEO / 스키마용 단일 소스 */
export const SITE = {
  name: "경희늘품한의원",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.neulsw.com").replace(/\/$/, ""),
  phoneDisplay: "031-224-1191",
  phoneTel: "+82-31-224-1191",
  email: undefined as string | undefined,
  locale: "ko_KR",
  address: {
    streetAddress: "동수원로 242번길 6",
    addressLocality: "수원시 권선구",
    addressRegion: "경기도",
    addressCountry: "KR",
    full: "경기도 수원시 권선구 동수원로 242번길 6",
  },
  hours: {
    weekday: "평일 09:00–20:00 (점심 13:00–14:00)",
    saturday: "토요일 09:00–14:00 (점심시간 없음)",
    summary: "평일 09:00–20:00 (점심 13:00–14:00) · 토요일 09:00–14:00",
  },
  doctor: {
    name: "이승욱",
    jobTitle: "대표원장",
    alumniOf: ["경희대학교 한의과대학", "경희의료원 한방병원"],
  },
  defaultDescription:
    "수원 권선구 경희늘품한의원. 이승욱 대표원장이 생약·초음파 유도 약침으로 만성질환과 척추관절 질환을 진료합니다.",
  defaultOgImage: "/images/home/profile.jpg",
  clinics: [
    {
      path: "/clinics/thyroid",
      name: "생약 클리닉",
      description:
        "생약 치료로 면역·만성 염증·회복력 개선을 돕는 경희늘품한의원 생약 클리닉입니다.",
    },
    {
      path: "/clinics/immunity",
      name: "척추관절 클리닉",
      description:
        "초음파 유도 약침으로 척추·관절 통증의 원인을 치료하는 경희늘품한의원 척추관절 클리닉입니다.",
    },
  ],
} as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** schema.org OpeningHoursSpecification */
export function openingHoursJsonLd() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ];
}
