function ClinicThyroid() {
  return (
    <div className="min-h-screen bg-cream-white">
      <section className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="stagger-fade-in">
          <h1 className="text-center text-3xl font-semibold leading-snug text-slate-900 md:text-4xl">
            생약, 우리 몸의 &apos;회복&apos;을 다시 깨우다
          </h1>

          <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
          <article className="space-y-4">
            <h2 className="text-xl font-bold text-primary-900 md:text-2xl">왜 생약인가요?</h2>
            <p className="text-base leading-relaxed text-slate-700 md:text-lg md:leading-loose">
              생약은 단순히 한 가지 성분만 들어있는 약이 아닙니다. 자연에서 온 수십, 수백 가지 유효
              성분들이 조화롭게 어우러진 &apos;천연의 복합체&apos;입니다. 우리는 이를 통해 몸의
              생화학적 반응을 억지로 만드는 대신, 스스로 다시 흐를 수 있도록 돕습니다.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="text-xl font-bold text-primary-900 md:text-2xl">
              완만하고 안전한, &apos;약동학적 완충&apos;의 힘
            </h2>
            <p className="text-base leading-relaxed text-slate-700 md:text-lg md:leading-loose">
              강한 단일 합성 의약품이 몸의 수치를 급격하게 바꾸어 놓는다면, 생약의 다양한 성분들은
              몸 안의 여러 신호 전달 경로를 동시에 어루만지며 밸런스를 찾습니다. 특히 인삼이나
              오미자 같은 한약에 들어 있는 &apos;아답토젠(Adaptogen)&apos; 등 생약 성분은 우리 몸이
              스트레스라는 외부 자극에 더 유연하게 대처하도록 돕는 완충 작용을 합니다. 마치 거친
              파도 앞에서 몸을 긴장시키는 대신, 파도를 타고 넘을 수 있는 유연함을 길러주는 것과
              같습니다.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="text-xl font-bold text-primary-900 md:text-2xl">
              질병을 보는 관점, &apos;증상&apos;이 아니라 &apos;시스템&apos;입니다
            </h2>
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-slate-700 md:text-lg md:leading-loose">
                현대 의학은 질병을 특정 수치나 결함으로 보고 이를 &apos;제거&apos;하는 데
                집중합니다. 하지만 우리 몸은 수많은 기능이 서로 연결된 하나의 거대한
                &apos;시스템&apos;입니다. 질병은 그 시스템의 연결고리가 약해졌을 때 발생합니다.
              </p>
              <p className="text-base leading-relaxed text-slate-700 md:text-lg md:leading-loose">
                단일 약물은 한 곳만 강제로 자극하여 당장은 수치를 낮출 수 있지만, 시간이 지나면
                몸이 저항하며 내성이 생기기 쉽습니다. 반면, 생약은 몸 전체의 네트워크가 스스로
                회복되는 &apos;상태(State)&apos;를 만드는 데 집중합니다. 무너진 회복의 네트워크를
                다시 연결해, 우리 몸이 스스로 건강한 상태로 돌아갈 수 있는 힘을 길러주는 것.
                이것이 제가 생약을 통해 지향하는 근본 치료입니다.
              </p>
            </div>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl shadow-card md:mt-16">
          <img
            src="/images/clinics/clinics%201.png"
            alt="생약 치료"
            className="w-full object-cover"
          />
        </div>
        </div>
      </section>
    </div>
  );
}

export default ClinicThyroid;
