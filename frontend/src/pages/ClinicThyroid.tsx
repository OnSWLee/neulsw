import SectionCard from "../components/SectionCard";

function ClinicThyroid() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      <SectionCard
        title="갑상선 클리닉"
        subtitle="자가면역 질환부터 기능 이상, 안병증까지 단계별 맞춤 관리"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 text-sm text-slate-700">
            <div className="font-semibold text-primary-900">
              진료 범위 & 접근
            </div>
            <ul className="list-disc space-y-2 pl-5">
              <li>자가면역 갑상선염(하시모토) · 그레이브스 병</li>
              <li>갑상선 기능 저하/항진, 임신·출산기 기능 변화 관리</li>
              <li>갑상선 안병증 관련 부종, 안구 건조/압박감 완화</li>
              <li>수술/방사선 치료 후 체력 회복 및 체중 관리</li>
            </ul>
          </div>
          <div className="space-y-3 rounded-xl bg-primary-50 p-4 text-sm text-primary-900">
            <div className="font-semibold">치료 포인트</div>
            <p>
              혈액검사(TSH, FT4, T3, 항체 수치) 기반으로 치료 단계별 목표를
              설정하고, 항진·저하 상태에 맞춘 한약 처방과 부작용 최소화를 위한
              생활/영양 지침을 제공합니다.
            </p>
            <p>
              자가면역 조절을 위해 염증 지표, 장-면역 축을 고려한 Adaptogen
              처방과 침·약침 치료를 병행합니다.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export default ClinicThyroid;





