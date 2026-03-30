import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../src/contexts/AuthContext";

export default function AdminIndexPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(true);
  const sanityStudioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || process.env.VITE_SANITY_STUDIO_URL || "http://localhost:3333";

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/login");
      return;
    }
    const go = async () => {
      try {
        const newWindow = window.open(sanityStudioUrl, "_blank", "noopener,noreferrer");
        if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
          window.location.href = sanityStudioUrl;
        } else {
          setIsRedirecting(false);
        }
      } catch {
        setError("Sanity Studio에 연결할 수 없습니다.");
        setIsRedirecting(false);
      }
    };
    go();
  }, [isAuthenticated, isAdmin, router, sanityStudioUrl]);

  if (error) {
    return <div className="mx-auto max-w-2xl p-8 text-red-700">{error}</div>;
  }
  if (isRedirecting) {
    return <div className="mx-auto max-w-2xl p-8 text-slate-600">Sanity Studio로 이동 중...</div>;
  }
  return <div className="mx-auto max-w-2xl p-8 text-slate-600">새 창에서 Studio가 열렸습니다.</div>;
}
