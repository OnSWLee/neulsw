import Link from "next/link";

const clinicData = [
  {
    to: "/clinics/thyroid",
    title: "생약 클리닉"
  },
  {
    to: "/clinics/immunity",
    title: "척추관절 클리닉"
  }
];

function Clinics() {
  return (
    <div className="min-h-screen bg-white">
      <header className="animate-fade-in border-b border-slate-200 px-6 py-16 text-center md:py-24">
        <p className="tot-eyebrow">치유 Clinics</p>
        <h1 className="tot-title mt-4">전문 클리닉 한눈에 보기</h1>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <p className="mx-auto max-w-3xl text-center text-base leading-loose text-slate-700 md:text-lg md:leading-loose">
          경희늘품한의원(수원 권선구)은 생약 클리닉과 척추관절 클리닉을 중심으로 진료합니다.
          대표원장 이승욱 한의사가 근본 회복과 통증 원인 치료를 안내합니다.
        </p>
        <div className="stagger-fade-in mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {clinicData.map((clinic) => (
            <Link
              key={clinic.to}
              href={clinic.to}
              className="group flex items-center justify-between gap-4 py-7"
            >
              <h2 className="font-serif text-2xl font-semibold text-slate-900 transition-colors group-hover:text-primary-700 md:text-3xl">
                {clinic.title}
              </h2>
              <span className="tot-link shrink-0">자세히 →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Clinics;
