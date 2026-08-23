import SectionCard from "../components/SectionCard";

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
    <div className="mx-auto flex max-w-6xl animate-fade-in flex-col gap-8 px-6 py-10">
      <SectionCard title="전문 클리닉 한눈에 보기">
        <p className="mb-6 text-base leading-relaxed text-slate-700 md:text-lg">
          경희늘품한의원(수원 권선구)은 생약 클리닉과 척추관절 클리닉을 중심으로 진료합니다.
          대표원장 이승욱 한의사가 근본 회복과 통증 원인 치료를 안내합니다.
        </p>
        <div className="flex flex-col gap-6">
          {clinicData.map((clinic) => (
            <a key={clinic.to} href={clinic.to} className="group">
              <div className="h-full rounded-2xl border border-slate-100 bg-cream-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-primary-900">
                    {clinic.title}
                  </h3>
                  <span className="text-sm font-semibold text-primary-600">
                    자세히 →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export default Clinics;





