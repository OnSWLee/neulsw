import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function SanityAdmin() {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(true);

  const sanityStudioUrl = import.meta.env.VITE_SANITY_STUDIO_URL || "http://localhost:3333";

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
      return;
    }

    // Sanity Studio 연결 확인
    const checkAndRedirect = async () => {
      try {
        // Sanity Studio가 실행 중인지 확인
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(sanityStudioUrl, {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // 새 창에서 열기 시도
        const newWindow = window.open(sanityStudioUrl, '_blank', 'noopener,noreferrer');

        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          // 팝업이 차단된 경우 현재 창에서 리다이렉트
          window.location.href = sanityStudioUrl;
        } else {
          // 새 창이 성공적으로 열린 경우, 잠시 후 이전 페이지로 돌아가거나 메시지 표시
          setIsRedirecting(false);
        }
      } catch (error) {
        console.error('Sanity Studio 연결 오류:', error);
        setError('Sanity Studio에 연결할 수 없습니다. Sanity Studio가 실행 중인지 확인해주세요.');
        setIsRedirecting(false);
      }
    };

    checkAndRedirect();
  }, [isAuthenticated, isAdmin, navigate, sanityStudioUrl]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-white">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-4 text-xl font-semibold text-red-600">오류 발생</div>
          <div className="mb-4 text-lg text-slate-600">{error}</div>
          <div className="mb-4 text-sm text-slate-500">
            Sanity Studio URL: <code className="bg-slate-100 px-2 py-1 rounded">{sanityStudioUrl}</code>
          </div>
          <div className="space-y-2">
            <a
              href={sanityStudioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              직접 열기
            </a>
            <button
              onClick={() => navigate("/")}
              className="block w-full px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition"
            >
              홈으로 돌아가기
            </button>
          </div>
          <div className="mt-6 text-xs text-slate-400">
            <p>Sanity Studio를 실행하려면:</p>
            <code className="block mt-2 bg-slate-100 p-2 rounded text-left">
              cd sanity-studio<br />
              npm install<br />
              npm run dev
            </code>
          </div>
        </div>
      </div>
    );
  }

  if (isRedirecting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-white">
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
          <div className="mb-4 text-lg text-slate-600">Sanity Studio로 리다이렉트 중...</div>
          <div className="text-sm text-slate-500">
            자동으로 이동하지 않으면{" "}
            <a
              href={sanityStudioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              여기를 클릭하세요
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mb-4 text-lg text-slate-600">Sanity Studio가 새 창에서 열렸습니다.</div>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default SanityAdmin;
