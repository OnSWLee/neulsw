import { useRouter } from "next/router";
import { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter();

  return (
    <div key={router.asPath} className="animate-fade-in">
      {children}
    </div>
  );
}
