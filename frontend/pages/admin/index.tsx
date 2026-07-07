import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../../src/contexts/AuthContext";

function getSanityStudioUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || process.env.VITE_SANITY_STUDIO_URL;
  if (fromEnv) return fromEnv;

  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.VITE_SANITY_PROJECT_ID ||
    "hlql019b";

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:3333";
    }
  }

  return `https://www.sanity.io/manage/project/${projectId}/desk`;
}

export default function AdminIndexPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(true);
  const sanityStudioUrl = getSanityStudioUrl();
  const isLocalStudio = sanityStudioUrl.includes("localhost");

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
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-8">
        <p className="text-red-700">{error}</p>
        <a
          href={sanityStudioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
        >
          Sanity Studio 열기
        </a>
      </div>
    );
  }
  if (isRedirecting) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-8 text-slate-600">
        <p>Sanity Studio로 이동 중...</p>
        {!isLocalStudio && (
          <p className="text-sm text-slate-500">
            Sanity 계정 로그인이 필요할 수 있습니다.
          </p>
        )}
        <a
          href={sanityStudioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          자동 이동이 안 되면 여기를 클릭하세요
        </a>
        <div>
          <Link href="/admin/legacy" className="text-sm text-slate-500 hover:text-slate-700">
            관리자 대시보드로 이동
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-8 text-slate-600">
      <p>새 창에서 Studio가 열렸습니다.</p>
      <a
        href={sanityStudioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
      >
        Sanity Studio 다시 열기
      </a>
      <div>
        <Link href="/admin/legacy" className="text-sm text-slate-500 hover:text-slate-700">
          관리자 대시보드로 이동
        </Link>
      </div>
    </div>
  );
}
