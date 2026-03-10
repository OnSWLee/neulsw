import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
  accent?: boolean;
}>;

function SectionCard({ title, subtitle, children, accent }: Props) {
  return (
    <section
      className={clsx(
        "rounded-2xl bg-cream-white p-6 shadow-card ring-1 ring-slate-100",
        accent && "border border-primary-100 ring-primary-50"
      )}
    >
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-primary-900">{title}</h2>
        {subtitle ? (
          <p className="text-base text-slate-500">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default SectionCard;





