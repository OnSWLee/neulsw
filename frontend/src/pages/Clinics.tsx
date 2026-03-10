import { Link } from "react-router-dom";
import SectionCard from "../components/SectionCard";

const clinicData = [
  {
    to: "/clinics/thyroid",
    title: "갑상선 클리닉"
  },
  {
    to: "/clinics/immunity",
    title: "면역 치료란?"
  }
];

function Clinics() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
      <SectionCard
        title="전문 클리닉 한눈에 보기"
      >
        <div className="flex flex-col gap-6">
          {clinicData.map((clinic) => (
            <Link key={clinic.to} to={clinic.to} className="group">
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
            </Link>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export default Clinics;





