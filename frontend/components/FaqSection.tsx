import type { FaqItem } from "../src/lib/seo";

type FaqSectionProps = {
  title?: string;
  items: FaqItem[];
  headingId?: string;
  showIntro?: boolean;
  bordered?: boolean;
};

export default function FaqSection({
  title = "자주 묻는 질문",
  items,
  headingId = "faq-heading",
  showIntro = true,
  bordered = true,
}: FaqSectionProps) {
  if (!items.length) return null;

  return (
    <section
      className={`bg-white px-6 py-14 md:py-20 ${bordered ? "border-t border-slate-200" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-3xl">
        <h2 id={headingId} className="scroll-mt-28 font-serif text-3xl font-semibold text-slate-900 md:text-4xl">
          {title}
        </h2>
        {showIntro ? (
          <p className="tot-eyebrow mt-3">
            경희늘품한의원 진료와 치료에 대해 자주 문의하시는 내용입니다.
          </p>
        ) : null}
        <dl className="mt-8 divide-y divide-slate-200 border-t border-slate-900">
          {items.map((item) => (
            <div key={item.question} className="py-7">
              <dt className="font-serif text-lg font-semibold leading-snug text-slate-900 md:text-xl">
                {item.question}
              </dt>
              <dd className="mt-3 text-base leading-relaxed text-slate-700 md:leading-loose">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
