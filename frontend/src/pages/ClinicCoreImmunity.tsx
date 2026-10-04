function ClinicPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex items-center justify-center bg-slate-100 p-3 md:p-4">
      <img src={src} alt={alt} className="h-auto max-h-[min(60vh,32rem)] w-auto max-w-full object-contain" />
    </div>
  );
}

function ClinicCoreImmunity() {
  return (
    <div className="min-h-screen bg-white stagger-fade-in">
      <section className="mx-auto max-w-6xl px-6 py-12 text-center md:py-16">
        <h1 className="font-serif text-3xl font-semibold leading-snug text-slate-900 md:text-5xl md:leading-tight">
          원인을 치료하는 초음파 유도 약침시술
        </h1>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-12 md:grid-cols-2 md:gap-12 md:pb-16">
        <div>
          <h2 className="border-t border-slate-900 pt-6 font-serif text-2xl font-semibold text-slate-900 md:text-3xl">01 초음파 기기</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg md:leading-loose">
            표층에 위치한 힘줄이나 인대는 촉진으로도 위치를 확인하고 치료할 수 있지만 심부에 위치한
            조직이나 혈관과 신경이 많이 분포한 조직은 보고 치료해야 합니다. 고해상도 초음파 기기를 활용하여
            통증의 원인을 정확하게 진단한 이후 삽입되는 침을 실시간으로 확인하면서 치료를 진행합니다.
          </p>
        </div>
        <div>
          <ClinicPhoto src="/images/clinics/SONO01.jpg" alt="경희늘품한의원 초음파 기기" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-12 md:grid-cols-2 md:gap-12 md:pb-16">
        <div>
          <h2 className="border-t border-slate-900 pt-6 font-serif text-2xl font-semibold text-slate-900 md:text-3xl">02 도담약침</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg md:leading-loose">
            척추 및 관절 치료를 위해 생약에서 멸균 및 증류 추출한 약침 성분을 활용해 신경 압박을 완화하고
            조직을 재생시키며 통증을 완화합니다. 스테로이드 성분이 들어가지 않기 때문에 부작용 걱정 없이
            치료 받을 수 있습니다.
          </p>
        </div>
        <div>
          <ClinicPhoto src="/images/clinics/SONO02.png" alt="경희늘품한의원 도담약침" />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-serif text-3xl font-semibold leading-snug text-slate-900 md:text-5xl md:leading-tight">
            초음파 유도 약침시술의 장점
          </h2>
          <img
            src="/images/clinics/SONO03.png"
            alt="초음파 유도 약침시술의 장점 그래프"
            className="mx-auto mt-8 h-auto w-full max-w-5xl object-contain md:mt-10"
          />
        </div>
      </section>
    </div>
  );
}

export default ClinicCoreImmunity;
