import type { FaqItem } from "../src/lib/seo";

type FaqSectionProps = {
  title?: string;
  items: FaqItem[];
};

export default function FaqSection({
  title = "자주 묻는 질문",
  items,
}: FaqSectionProps) {
  if (!items.length) return null;

  return (
    <section className="border-t border-slate-100 bg-cream-white px-6 py-12 md:py-16" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-base text-slate-600 md:text-lg">
          경희늘품한의원 진료와 치료에 대해 자주 문의하시는 내용입니다.
        </p>
        <dl className="mt-8 space-y-6">
          {items.map((item) => (
            <div key={item.question} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card md:p-6">
              <dt className="text-lg font-semibold text-primary-900">{item.question}</dt>
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
