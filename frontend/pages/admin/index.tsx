import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../../src/contexts/AuthContext";

export default function AdminIndexPage() {
  const { isAuthenticated, isAdmin, isAuthReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && (!isAuthenticated || !isAdmin)) {
      router.replace("/login");
    }
  }, [isAuthReady, isAuthenticated, isAdmin, router]);

  if (!isAuthReady || !isAuthenticated || !isAdmin) {
    return (
      <div className="mx-auto max-w-2xl p-8 text-slate-600">확인 중...</div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-white">
      <div className="mx-auto max-w-2xl space-y-8 px-6 py-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">관리자</h1>
          <p className="mt-2 text-sm text-slate-600">
            블로그 글 작성·수정은 아래 버튼을 눌러 진행하세요.
          </p>
        </div>

        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">블로그 글 작성</h2>
          <p className="text-sm text-slate-600">
            사이트 안에 있는 편집기에서 바로 글을 작성할 수 있습니다.
            처음 사용 시 Sanity 계정(Google 등) 로그인이 한 번 필요할 수 있습니다.
          </p>
          <Link
            href="/admin/studio"
            className="inline-block rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800"
          >
            블로그 편집기 열기
          </Link>
        </div>

        <div className="space-y-3 text-sm text-slate-500">
          <Link href="/admin/legacy" className="block hover:text-slate-700">
            글 목록 보기
          </Link>
          <Link href="/blog" className="block hover:text-slate-700">
            블로그 페이지로 이동
          </Link>
          <Link href="/" className="block hover:text-slate-700">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
