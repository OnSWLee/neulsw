/**
 * API 요청 베이스 URL
 * - 로컬에서 Docker 없이 실행 시: .env.local에 VITE_API_URL=http://localhost:5000 설정
 * - Vercel 등 배포 시 백엔드가 다른 도메인이면: VITE_API_URL=https://your-backend-url 설정
 * - 비어 있으면 상대 경로 /api 사용 (같은 도메인 또는 Vite proxy)
 */
export const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return API_BASE ? `${API_BASE}${p}` : p;
}
