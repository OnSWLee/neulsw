import FaqSection from "../../components/FaqSection";
import { FAQ_GROUPS } from "../lib/seo";

function Faq() {
  return (
    <div className="min-h-screen bg-cream-white">
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center stagger-fade-in">
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">FAQ</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
            경희늘품한의원 진료, 원장, 생약·척추관절 클리닉에 대해 자주 묻는 질문을 모았습니다.
          </p>
          <nav aria-label="FAQ 목차" className="mt-8 flex flex-wrap justify-center gap-3">
            {FAQ_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#faq-${group.id}`}
                className="rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-800 transition hover:bg-primary-100"
              >
                {group.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {FAQ_GROUPS.map((group, index) => (
        <FaqSection
          key={group.id}
          title={group.title}
          items={group.items}
          headingId={`faq-${group.id}`}
          showIntro={false}
          bordered={index > 0}
        />
      ))}
    </div>
  );
}

export default Faq;
