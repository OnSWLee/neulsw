/**
 * API 요청 베이스 URL
 * Next 기준: NEXT_PUBLIC_API_URL 사용 (예: http://localhost:5000)
 * 미설정 시 상대경로 /api 사용
 */
export const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? process.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return API_BASE ? `${API_BASE}${p}` : p;
}
