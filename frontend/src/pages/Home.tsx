import Link from "next/link";

function Home() {
  return (
    <div className="min-h-screen bg-cream-white">
      {/* 인사말 및 의사 소개 섹션 */}
      <section id="about-doctor" className="doctor-profile-section mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="stagger-fade-in space-y-8 md:space-y-12">
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-slate-200 shadow-card">
            <img
              src="/images/home/profile.jpg"
              alt="이승욱 대표원장"
              className="aspect-[4/5] w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src.includes(".jpg")) {
                  target.src = "/images/home/profile.png";
                } else if (target.src.includes(".png")) {
                  target.src = "/images/doctor/doctor-photo.png";
                }
              }}
            />
          </div>

          {/* 섹션 1: 인사말 */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              안녕하세요.
            </h1>
          </div>

          {/* 섹션 2: 의사 프로필 */}
          <div className="profile-content space-y-10 md:space-y-12">
            <div className="profile-header space-y-4">
              <p className="text-xl font-semibold text-slate-900 leading-relaxed md:text-2xl md:leading-relaxed">
                이승욱 대표원장입니다.
              </p>
              <p className="text-xl font-semibold text-slate-900 leading-relaxed md:text-2xl md:leading-relaxed">
                저는 체계적으로 진료하고 공부하기를 좋아하는 학자형 한의사입니다.
              </p>
            </div>

            <article className="profile-block mb-8 md:mb-10">
              <p className="text-base text-slate-700 leading-loose mb-6 md:text-lg md:leading-loose md:mb-8">
                경희대학교 학부를 졸업하고 경희의료원 한방병원에서 한방 내과 전문의 수련 과정을 거쳐 임상한의학 박사과정까지 수료했습니다. 임상 한의학 박사로서 제 역할은 <strong className="font-bold text-primary-700">생약 전문가</strong>로서 생약의 특성을 깊이 이해하고, 이를 이용해 환자의 건강을 근본적으로 개선하는 것이라 믿어왔습니다.
              </p>
            </article>

            <article className="profile-block mb-8 md:mb-10">
              <p className="text-base text-slate-700 leading-loose mb-6 md:text-lg md:leading-loose md:mb-8">
                쉽게 회복되지 않는 난치성 만성 질환의 이면에는 면역체계의 문제가 있습니다. 그리고 생약을 이용하는 한의학 치료의 장점은 면역체계의 불균형을 안정화하고, 만성 염증을 일으키는 병독을 제거하는 것에 있습니다.
              </p>
            </article>

            <article className="profile-block mb-8 md:mb-10">
              <p className="text-base text-slate-700 leading-loose mb-6 md:text-lg md:leading-loose md:mb-8">
                <strong className="font-bold text-primary-700">경희늘품한의원</strong>을 개원하고 수많은 환자분들을 진료하며, 더 이상 진료실 안에만 머물러서는 안 되겠다는 결론에 도달했습니다. 생약 치료를 병행하면 더 빠르게 회복할 환자분들이, 근본적인 원인은 해결하지 못한 채 증상 억제에만 의존하다 결국 병을 키워 찾아오시는 안타까운 상황을 반복해서 목격했기 때문입니다.
              </p>
            </article>

            <article className="profile-block highlight-action mb-8 md:mb-10">
              <p className="text-base text-slate-700 leading-loose mb-6 md:text-lg md:leading-loose md:mb-8">
                한의학의 생약 치료가 가진 효용을 객관적인 임상 데이터를 바탕으로 공유하고자 합니다. 관심 있으신 분들은 제가 작성한 글들을 천천히 읽어보시길 권합니다. 오랜 고통을 끝낼 근본적인 방법을 찾을 수 있을겁니다.
              </p>
            </article>

            <div className="mx-auto mt-4 max-w-xl rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 via-white to-beige-50 p-6 text-center shadow-card md:mt-6 md:p-8">
              <p className="text-lg font-semibold tracking-wide text-primary-700 md:text-xl">
                더 자세한 이야기가 궁금하다면?
              </p>
              <Link
                href="/doctor"
                className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary-700 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-xl md:mt-6 md:text-lg"
              >
                About me
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-lg"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 증상 선택 섹션 */}
      <section className="bg-cream-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6 stagger-fade-in">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
            어떻게 치료하나요?
          </h2>
          <div className="flex flex-col gap-6">
            {[
              {
                to: "/clinics/thyroid",
                title: "생약 호르몬 클리닉"
              },
              {
                to: "/clinics/immunity",
                title: "척추관절 클리닉"
              }
            ].map((clinic) => (
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
        </div>
      </section>
    </div>
  );
}

export default Home;
