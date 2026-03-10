import SectionCard from "../components/SectionCard";

function ClinicCoreImmunity() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      <SectionCard
        title="면역 치료란?"
        subtitle="말초신경 회복과 면역 체계 강화를 통한 근본적 건강 회복"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 text-sm text-slate-700">
            <div className="font-semibold text-primary-900">진료 범위</div>
            <ul className="list-disc space-y-2 pl-5">
              <li>당뇨성 말초신경병증, 항암 후 신경병증</li>
              <li>저림·시림, 근력 저하, 자율신경 불균형</li>
              <li>만성 피로, 번아웃, 수면·스트레스 불균형</li>
              <li>면역 약화, 잦은 감기, 회복이 느린 체질</li>
              <li>호르몬 리듬 변동에 따른 컨디션 기복</li>
              <li>목·허리 디스크, 협착증과 동반된 신경 증상</li>
            </ul>
          </div>
          <div className="space-y-3 rounded-xl bg-primary-50 p-4 text-sm text-primary-900">
            <div className="font-semibold">치료 포인트</div>
            <p>
              침·약침으로 신경 주위 순환을 개선하고, 신경재생을 돕는 한약
              처방과 면역 강화 Adaptogen 성분을 결합해 말초신경 증상과 면역 체계를
              동시에 회복시킵니다.
            </p>
            <p>
              Rhodiola, Schisandra 등 Adaptogen 성분과 체질에 맞춘 한약을 통해
              스트레스 적응력과 에너지 대사를 향상시키고, 혈당 관리, 항산화·항염
              영양 가이드, 수면 리듬 교정을 함께 진행합니다.
            </p>
            <p>
              HRV·수면 패턴 등 객관 지표를 활용한 모니터링과 식이·호흡·수면
              루틴 코칭으로 지속 가능한 컨디션 관리를 지원합니다.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export default ClinicCoreImmunity;

