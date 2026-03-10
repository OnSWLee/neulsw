import { Link } from "react-router-dom";
import SectionCard from "../components/SectionCard";

const clinicLinks = [
  {
    to: "/clinics/thyroid",
    title: "갑상선 클리닉",
    description: "갑상선 결절, 갑상선염, 갑상선 기능 저하증, 갑상선 기능 항진증, 갑상선 안병증 등"
  },
  {
    to: "/clinics/core-immunity",
    title: "코어 면역 치료",
    description: "면역 안정화를 통한 난치성 질환 치료"
  }
];

function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <div className="rounded-3xl bg-primary-700 px-8 py-12 text-white shadow-card">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl text-white">
            경희늘품한의원
          </h1>
          <p className="text-xl text-primary-50">
            체계적인 진단과 맞춤 치료로 건강한 삶을 찾아줍니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/clinics"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary-800 shadow-sm hover:bg-primary-50"
            >
              전문 클리닉 보기
            </Link>
            <Link
              to="/doctor"
              className="rounded-full border border-white/70 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              원장 소개
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {clinicLinks.map((clinic) => (
          <Link key={clinic.to} to={clinic.to} className="group">
            <SectionCard title={clinic.title} subtitle={clinic.description} accent>
              <div className="mt-3 text-sm font-semibold text-primary-700 group-hover:underline">
                자세히 보기 →
              </div>
            </SectionCard>
          </Link>
        ))}
      </div>

      <SectionCard
        title="왜 늘품일까?"
        subtitle="환자의 신뢰를 최우선으로, 데이터를 바탕으로 치료 결과를 설명합니다."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "통합 진단",
              desc: "서양의학 검사 결과와 한의학적 진찰을 통합하여 원인을 규명합니다."
            },
            {
              title: "맞춤 처방",
              desc: "체질, 생활 습관, 직업 환경까지 고려한 1:1 처방과 생활 관리."
            },
            {
              title: "지표 중심 추적",
              desc: "혈액검사·영상 검사 수치 변화와 증상 개선을 함께 관리합니다."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-slate-50 p-4">
              <div className="text-base font-semibold text-primary-900">
                {item.title}
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export default Home;










