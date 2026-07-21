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
      <SectionCard
        title="전문 클리닉 한눈에 보기"
      >
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





