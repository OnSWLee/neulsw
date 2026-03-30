import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../src/contexts/AuthContext";
import { apiUrl } from "../../../src/lib/api";

export default function AdminBlogNewPage() {
  const { isAuthenticated, isAdmin, token } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated || !isAdmin) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl("/api/blog"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, excerpt, content, image, date }),
      });
      if (!response.ok) throw new Error("저장 실패");
      await router.push("/admin/legacy");
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold text-slate-900">새 블로그 글 작성</h1>
        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-cream-white p-6 shadow-sm">
          {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="제목" className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" />
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required rows={3} placeholder="요약" className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={15} placeholder="내용" className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" />
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="이미지 경로" className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" />
          <button type="submit" disabled={isLoading} className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50">
            {isLoading ? "저장 중..." : "작성"}
          </button>
        </form>
      </div>
    </div>
  );
}
