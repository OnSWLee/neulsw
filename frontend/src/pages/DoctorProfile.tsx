import { useState } from "react";
import clsx from "clsx";

type AboutSection = {
  imageAlt: string;
  title: string;
  highlights?: string[];
  paragraphs: string[];
  images: string[];
};

const sections: AboutSection[] = [
  {
    imageAlt: "2006 ~ 2016",
    title: "2006 ~ 2016",
    highlights: [
      "경희대학교 한의과대학 졸업",
      "경희의료원 한방내과전문의 취득",
      "경희의료원 한방내분비센터 재직",
      "북경중의학대학 연수",
      "대만중의학대학 연수",
    ],
    paragraphs: [
      "경희대학교 한의과대학 졸업 후 경희대학교 한방병원에서 수련을 마치고 전문의 자격증을 취득하였습니다. 의학적 기초 지식을 쌓고 병원에서 다양한 환자를 접하며 임상의로서 기초 소양을 다지는 시기였습니다. 특히 내분비 센터에서 호르몬 질환 환자들을 깊게 공부했습니다.",
    ],
    images: [
      "/images/doctor/section1-1.jpg",
      "/images/doctor/section1-2.jpg",
      "/images/doctor/section1-3.jpg",
    ],
  },
  {
    imageAlt: "2014 ~ 2020",
    title: "2014 ~ 2020",
    highlights: [
      "대한민국 육군 군의관 근무",
      "경희대학교 임상한의학 박사",
      "미국 근골격계 초음파 인증(RMSK) 취득",
      "하버드의과대학 연수",
      "네이버 상담한의사",
    ],
    paragraphs: [
      "임상 한의학과 대학원에 진학하여 연구 데이터와 논문을 바탕으로 깊이있는 공부를 하고 박사학위를 취득하였습니다. 군의관으로 복무하는 중 대한한의학회, 대한한방내과학회, 대한침도학회 등 다양한 학회 활동을 하였으며 미국 '근골격계 초음파 인증 자격(RMSK)'를 취득하였습니다.",
    ],
    images: [
      "/images/doctor/section2-1.jpg",
      "/images/doctor/section2-2.jpg",
      "/images/doctor/section2-3.jpg",
    ],
  },
  {
    imageAlt: "2020 ~ 현재",
    title: "2020 ~ 현재",
    highlights: [
      "경희늘품한의원 대표원장",
      "경희대학교 외래실습 책임교수",
      "대한 침도학회 정회원",
      "대한 한의학회 정회원",
      "대한 한방내과학회 정회원",
    ],
    paragraphs: [
      "이숲한의원에서 로컬 환자 진료 경험을 쌓은 후 경희늘품한의원을 개원하여 수년간 성실히 진료중입니다. 또 임상 한의학 박사로서 전문성을 인정 받아 경희대학교 외래임상실습 책임교수로 위임되었습니다. 지금도 더 나은 진료를 위해 매일 연구하며 노력하고 있습니다.",
    ],
    images: [
      "/images/doctor/section3-1.jpg",
      "/images/doctor/section3-2.jpg",
      "/images/doctor/section3-3.jpg",
    ],
  },
];

function resolveImageSrc(src: string, attempt = 0) {
  if (attempt === 0) return src;
  if (attempt === 1) return src.replace(".jpg", ".png");
  if (attempt === 2) return src.replace(".jpg", ".JPG");
  return src;
}

function SectionImageCarousel({ images, altPrefix }: { images: string[]; altPrefix: string }) {
  const [index, setIndex] = useState(0);
  const [fallbackAttempt, setFallbackAttempt] = useState<Record<number, number>>({});

  const goPrev = () => setIndex((current) => (current - 1 + images.length) % images.length);
  const goNext = () => setIndex((current) => (current + 1) % images.length);

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-lg bg-slate-200">
          <img
            src={resolveImageSrc(images[index], fallbackAttempt[index] ?? 0)}
            alt={`${altPrefix} 사진 ${index + 1}`}
            className="h-full w-full object-cover"
            onError={() => {
              setFallbackAttempt((prev) => {
                const nextAttempt = (prev[index] ?? 0) + 1;
                if (nextAttempt > 2) return prev;
                return { ...prev, [index]: nextAttempt };
              });
            }}
          />
        </div>
        <button
          type="button"
          onClick={goPrev}
          aria-label="이전 사진"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="다음 사진"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            aria-label={`${dotIndex + 1}번째 사진 보기`}
            onClick={() => setIndex(dotIndex)}
            className={clsx(
              "h-2.5 rounded-full transition",
              dotIndex === index ? "w-6 bg-primary-700" : "w-2.5 bg-slate-300 hover:bg-slate-400"
            )}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-sm text-slate-500">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

function parsePeriod(title: string) {
  const [start = "", end = ""] = title.split("~").map((part) => part.trim());
  return { start, end };
}

function SectionPeriodTitle({ title, index, highlights }: { title: string; index: number; highlights?: string[] }) {
  const { start, end } = parsePeriod(title);
  const isPresent = end === "현재";

  return (
    <header className="flex gap-4 md:gap-5">
      <div className="w-1 shrink-0 rounded-full bg-primary-700" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <h2 className="sr-only">{title}</h2>
        <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <time dateTime={start} className="text-4xl font-semibold tabular-nums leading-none text-slate-900 md:text-5xl">
            {start}
          </time>
          <span className="text-lg font-light text-slate-300 md:text-xl" aria-hidden="true">
            —
          </span>
          {isPresent ? (
            <span className="text-4xl font-semibold leading-none text-primary-700 md:text-5xl">{end}</span>
          ) : (
            <time dateTime={end} className="text-4xl font-semibold tabular-nums leading-none text-slate-900 md:text-5xl">
              {end}
            </time>
          )}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6 md:gap-10">
          <p className="shrink-0 text-xs font-medium tracking-[0.18em] text-slate-400">
            이력 {String(index + 1).padStart(2, "0")}
          </p>
          {highlights && highlights.length > 0 ? (
            <ul className="space-y-1 text-sm leading-relaxed text-slate-600 md:text-base">
              {highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary-500" aria-hidden="true">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function AboutSectionBlock({ section, index }: { section: AboutSection; index: number }) {
  return (
    <article className="space-y-8">
      <div className="space-y-6">
        <SectionPeriodTitle title={section.title} index={index} highlights={section.highlights} />
        <div className="space-y-3 border-t border-slate-100 pt-6">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-slate-700 md:text-lg md:leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <SectionImageCarousel images={section.images} altPrefix={section.imageAlt} />
    </article>
  );
}

function DoctorProfile() {
  return (
    <div className="min-h-screen bg-cream-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="space-y-16 md:space-y-20">
          {sections.map((section, index) => (
            <AboutSectionBlock key={section.title} section={section} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
