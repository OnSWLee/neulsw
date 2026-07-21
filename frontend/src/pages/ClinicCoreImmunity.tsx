function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-slate-100 bg-slate-200 shadow-card"
      aria-label={label}
    >
      <span className="text-sm text-slate-500">사진 준비 중</span>
    </div>
  );
}

function StatArrow({
  direction,
  badge,
  leftValue,
  leftLabel,
  rightValue,
  rightLabel,
}: {
  direction: "up" | "down";
  badge: string;
  leftValue: string;
  leftLabel: string;
  rightValue: string;
  rightLabel: string;
}) {
  const path =
    direction === "up"
      ? "M 28 98 Q 120 18 212 38"
      : "M 28 38 Q 120 102 212 82";
  const arrowHead =
    direction === "up" ? "212,38 204,50 220,46" : "212,82 204,70 220,74";

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mx-auto mb-8 h-40 w-full max-w-[300px] overflow-visible md:h-44 md:max-w-[340px]">
        <svg
          viewBox="0 0 240 120"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={path}
            fill="none"
            stroke="#1A3C34"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <polygon points={arrowHead} fill="#1A3C34" />
        </svg>
        <span className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-700 px-2 text-xs font-bold leading-tight text-white md:h-20 md:w-20 md:text-sm">
          {badge}
        </span>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 md:gap-6">
        <div>
          <p className="text-2xl font-bold text-slate-900 md:text-3xl">{leftValue}</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 md:text-sm">{leftLabel}</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900 md:text-3xl">{rightValue}</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 md:text-sm">{rightLabel}</p>
        </div>
      </div>
    </div>
  );
}

function ClinicCoreImmunity() {
  return (
    <div className="min-h-screen bg-cream-white stagger-fade-in">
      <section className="mx-auto max-w-6xl px-6 py-12 text-center md:py-16">
        <h1 className="text-3xl font-semibold leading-snug text-slate-900 md:text-4xl">
          원인을 치료하는 초음파 유도 약침시술
        </h1>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-12 md:grid-cols-2 md:gap-12 md:pb-16">
        <div>
          <h2 className="text-xl font-bold text-primary-900 md:text-2xl">01 초음파 기기</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg md:leading-loose">
            표층에 위치한 힘줄이나 인대는 촉진으로도 위치를 확인하고 치료할 수 있지만 심부에 위치한
            조직이나 혈관과 신경이 많이 분포한 조직은 보고 치료해야 합니다. 고해상도 초음파 기기를 활용하여
            통증의 원인을 정확하게 진단한 이후 삽입되는 침을 실시간으로 확인하면서 치료를 진행합니다.
          </p>
        </div>
        <div>
          <PhotoPlaceholder label="초음파 기기 사진" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-12 md:grid-cols-2 md:gap-12 md:pb-16">
        <div>
          <h2 className="text-xl font-bold text-primary-900 md:text-2xl">02 도담약침</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg md:leading-loose">
            척추 및 관절 치료를 위해 생약에서 멸균 및 증류 추출한 약침 성분을 활용해 신경 압박을 완화하고
            조직을 재생시키며 통증을 완화합니다. 스테로이드 성분이 들어가지 않기 때문에 부작용 걱정 없이
            치료 받을 수 있습니다.
          </p>
        </div>
        <div>
          <PhotoPlaceholder label="도담약침 사진" />
        </div>
      </section>

      <section className="border-t border-slate-100 bg-cream-white px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3 md:gap-8">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <h3 className="mb-2 text-center text-base font-semibold text-slate-900 md:text-lg">시술정확도비교</h3>
            <p className="mb-6 text-center text-[10px] leading-relaxed text-slate-500 md:text-xs">
              *출처: 대한내과학회지 제89권 제6호 통권제684호(2015)
            </p>
            <StatArrow
              direction="up"
              badge="65% 상승"
              leftValue="32%"
              leftLabel="초음파를 보지 않으며 주사할 경우"
              rightValue="97%"
              rightLabel="초음파를 확인하면서 주사할 경우"
            />
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <h3 className="mb-8 text-center text-base font-semibold text-slate-900 md:text-lg">
              기능 개선 척도
              <br />
              (Oxford Knee Score)
            </h3>
            <StatArrow
              direction="up"
              badge="약 61% 개선"
              leftValue="평균 20.20"
              leftLabel="치료 전"
              rightValue="평균 32.92"
              rightLabel="치료 후"
            />
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <h3 className="mb-8 text-center text-base font-semibold text-slate-900 md:text-lg">
              통증 완화 척도
              <br />
              (Numeric Pain Scale)
            </h3>
            <StatArrow
              direction="down"
              badge="약 54% 완화"
              leftValue="평균 8.33"
              leftLabel="치료 전"
              rightValue="평균 4.49"
              rightLabel="치료 후"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClinicCoreImmunity;
