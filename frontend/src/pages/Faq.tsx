import FaqSection from "../../components/FaqSection";
import { FAQ_GROUPS } from "../lib/seo";

function Faq() {
  return (
    <div className="min-h-screen bg-white">
      <header className="animate-fade-in border-b border-slate-200 px-6 py-16 text-center md:py-24">
        <p className="tot-eyebrow mx-auto max-w-2xl">
          경희늘품한의원 진료, 원장, 생약·척추관절 클리닉에 대해 자주 묻는 질문을 모았습니다.
        </p>
        <h1 className="tot-title mt-4">FAQ</h1>
        <nav
          aria-label="FAQ 목차"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-slate-300"
        >
          {FAQ_GROUPS.map((group, index) => (
            <span key={group.id} className="flex items-center gap-x-2">
              {index > 0 ? <span aria-hidden="true">·</span> : null}
              <a href={`#faq-${group.id}`} className="tot-link">
                {group.title}
              </a>
            </span>
          ))}
        </nav>
      </header>

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
