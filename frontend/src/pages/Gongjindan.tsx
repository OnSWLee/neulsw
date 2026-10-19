import Image from "next/image";
import { useState } from "react";

const audiences = [
  ["하나", "치료 후 빠른 회복이 필요한 분"],
  ["둘", "성장과 면역력 모두 필요한 아이"],
  ["셋", "만성피로, 무력감을 느끼는 분"],
  ["넷", "집중력 및 기억력 증진이 필요한 분"],
  ["다섯", "척추 질환으로 통증이 심한 환자"],
  ["여섯", "노화 예방 및 기력 강화가 필요한 어르신"],
];

const papers = [
  {
    title: "기억력 개선 및 치매 예방",
    source: "동의신경정신과학회지 v.15 No.2, 2004년",
    body: "알츠하이머형 치매 환자에게 공진단을 100일간 투여한 연구에서, 인지 기능 검사(K-DRS) 총점 평균이 투여 전 93±12.1점에서 투여 후 114±14.5점으로 올랐습니다. 공진단 투여 이후 인지 기능이 나아진 결과입니다.",
  },
  {
    title: "간 보호 효과",
    source: "한의학과 박사학위논문, 2016. 2, 한무규",
    body: "DSF를 투여한 집단에서는 에탄올로 인한 간 손상이 의미 있게 줄었습니다. 체중 변화와 간 무게 증가도 통계적으로 차이가 나서, 알코올성 간 손상을 완화하는 데 참고할 수 있는 결과입니다.",
  },
  {
    title: "급성 통증 완화 효과",
    source: "대한한방내과학회지 제36권 제3호, 2015. 9",
    body: "중등도 이상의 급성·만성 통증 환자에게 양의공진단을 한방치료와 함께 사용한 후향적 연구입니다. 급성인지 만성인지와 관계없이 심한 통증이 의미 있게 줄었고, 진통제 반응이 적던 통증에서도 호전이 보고되었습니다.",
  },
  {
    title: "항암 효과",
    source: "동의생리병리학회지 v.17 no.6, 2003년, 은재순",
    body: "세포 실험에서 사향을 항암제 마이토마이신 C와 함께 처리하자 대장암 세포의 증식 억제가 커졌고, 마이토마이신 C의 세포 독성도 더 강해졌습니다. 사향이 이 항암제와 함께 쓰일 때 효과를 보탤 수 있음을 보여 준 연구입니다.",
  },
  {
    title: "면역력 증진",
    source: "대한침구의학회지 16권 3호, 1999. 11, 주정주",
    body: "공진단 약침 이후 림프구와 CD4+ T세포 수가 늘고 면역 기능이 개선되었습니다. 공진단 약침이 면역 조절에 영향을 줄 수 있음을 살핀 연구입니다.",
  },
  {
    title: "정력 강화",
    source: "대한한방부인과학회지 제17권 제1호, 2004. 2, 이진무",
    body: "양의궁신단을 복용한 뒤 생식 기능이 일부 회복된 결과가 보고되었습니다. 노화로 떨어진 생식 기능을 보완할 가능성을 살펴본 연구입니다.",
  },
];

const kinds = [
  {
    name: "사향공진단",
    body: "정품 사향을 사용해서 원방 그대로 제조한 공진단",
  },
  {
    name: "녹용공진단",
    body: "정품 사향 대신 녹용 비율을 2배로 늘려 제조한 공진단",
  },
  {
    name: "침향공진단",
    body: "사향 대신 침향으로 비용 부담을 줄인 공진단",
  },
];

const promises = [
  {
    title: "좋은 것만 드립니다.",
    body: "식품으로 유통되는 식용한약이 아닌 약품으로 유통되는 식품의약품안전처 인증 약재만 사용합니다. 국내산 당귀와 산수유 그리고 정품 사향과 녹용을 사용합니다.",
  },
  {
    title: "신선합니다.",
    body: "소량 구매한 신선한 약재를 진공포장하여 보관하다 주문이 들어오면 바로바로 조제합니다. 신선한 약재가 오랜 기간 냉동보관되며 변질될 가능성이 줄어듭니다.",
  },
  {
    title: "더 많이 드립니다.",
    body: "1환에 4.5g에서 5g이 들어있는 시중 공진단과 다르게 약재를 늘려 1환에 5.5g으로 조제했습니다.",
  },
];

function PaperSlider() {
  const [index, setIndex] = useState(0);
  const paper = papers[index];
  const go = (nextIndex: number) => {
    const count = papers.length;
    setIndex((nextIndex + count) % count);
  };

  return (
    <section>
      <h2 className="border-t border-slate-900 pt-8 font-serif text-2xl font-semibold text-slate-900 md:text-3xl">
        논문으로 입증된 공진단의 효능
      </h2>
      <div className="mt-8 overflow-hidden bg-slate-100">
        <Image
          src="/images/clinics/effective.jpg"
          alt="공진단"
          width={5000}
          height={2292}
          sizes="(min-width: 768px) 768px, 100vw"
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="mt-6 border border-slate-200 px-6 py-8 md:px-10 md:py-10">
        <p className="text-xs tracking-[0.18em] text-slate-500">
          {index + 1} / {papers.length}
        </p>
        <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-slate-900 md:text-3xl">
          {paper.title}
        </h3>
        <p className="mt-2 font-serif text-sm italic text-slate-500">{paper.source}</p>
        <p className="mt-5 min-h-[7.5rem] text-base leading-loose text-slate-700 md:text-lg">{paper.body}</p>
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {papers.map((item, itemIndex) => (
              <button
                key={item.title}
                type="button"
                aria-label={`${item.title} 보기`}
                aria-current={itemIndex === index ? "true" : undefined}
                onClick={() => go(itemIndex)}
                className={
                  itemIndex === index
                    ? "h-2.5 w-6 rounded-full bg-slate-900"
                    : "h-2.5 w-2.5 rounded-full bg-slate-300 hover:bg-slate-400"
                }
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="이전 논문"
              className="flex h-10 w-10 items-center justify-center border border-slate-900 text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="다음 논문"
              className="flex h-10 w-10 items-center justify-center border border-slate-900 text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gongjindan() {
  return (
    <div className="min-h-screen bg-white">
      <header className="animate-fade-in border-b border-slate-200 px-6 py-16 text-center md:py-24">
        <p className="tot-eyebrow">생약 클리닉</p>
        <h1 className="tot-title mt-4">직접만든 수제 공진단</h1>
      </header>

      <div className="mx-auto max-w-3xl space-y-16 px-6 py-14 md:space-y-20 md:py-20">
        <section>
          <h2 className="font-serif text-2xl font-semibold text-slate-900 md:text-3xl">이런 분께 권합니다</h2>
          <table className="mt-8 w-full border-t border-slate-900 text-left">
            <caption className="sr-only">공진단을 권하는 경우</caption>
            <tbody>
              {audiences.map(([label, text]) => (
                <tr key={label} className="border-b border-slate-200">
                  <th
                    scope="row"
                    className="w-24 py-5 pr-4 align-top font-serif text-lg font-semibold text-slate-900 md:w-28 md:text-xl"
                  >
                    {label}
                  </th>
                  <td className="py-5 text-base leading-relaxed text-slate-700 md:text-lg">{text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <PaperSlider />

        <section>
          <h2 className="border-t border-slate-900 pt-8 font-serif text-2xl font-semibold text-slate-900 md:text-3xl">
            공진단의 종류
          </h2>
          <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {kinds.map((kind) => (
              <li key={kind.name} className="py-6">
                <h3 className="font-serif text-2xl font-semibold text-slate-900 md:text-3xl">{kind.name}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">{kind.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-slate-900 pt-8">
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {promises.map((item) => (
              <article key={item.title} className="py-7">
                <h3 className="font-serif text-2xl font-semibold text-slate-900 md:text-3xl">{item.title}</h3>
                <p className="mt-3 text-base leading-loose text-slate-700 md:text-lg">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Gongjindan;
