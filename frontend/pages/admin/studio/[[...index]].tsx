import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../src/contexts/AuthContext";
import config from "../../../sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-600">
        블로그 편집기를 불러오는 중...
      </div>
    ),
  }
);

export default function AdminStudioPage() {
  const { isAuthenticated, isAdmin, isAuthReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && (!isAuthenticated || !isAdmin)) {
      router.replace("/login");
    }
  }, [isAuthReady, isAuthenticated, isAdmin, router]);

  if (!isAuthReady || !isAuthenticated || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-600">
        확인 중...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>블로그 편집 | 늘품한의원</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <NextStudio config={config} />
    </>
  );
}
