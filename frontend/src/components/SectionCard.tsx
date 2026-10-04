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
        "border-t border-slate-200 bg-white py-8",
        accent && "border-slate-900"
      )}
    >
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="font-serif text-2xl font-semibold text-slate-900">{title}</h2>
        {subtitle ? (
          <p className="text-base text-slate-500">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default SectionCard;





