import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../src/contexts/AuthContext";
import { apiUrl } from "../../src/lib/api";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}

export default function AdminLegacyPage() {
  const { isAuthenticated, isAdmin, token } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/login");
      return;
    }
    const fetchPosts = async () => {
      try {
        const response = await fetch(apiUrl("/api/blog?limit=100"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("failed");
        const data = await response.json();
        setPosts(data.posts || []);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [isAuthenticated, isAdmin, router, token]);

  if (!isAuthenticated || !isAdmin) return null;
  if (isLoading) return <div className="mx-auto max-w-6xl px-6 py-20">로딩 중...</div>;

  return (
    <div className="min-h-screen bg-cream-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">관리자 대시보드</h1>
          <Link href="/admin/blog/new" className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">새 글 작성</Link>
        </div>
        <div className="rounded-lg bg-cream-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">제목</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">작성자</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">날짜</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{post.title}</div>
                      <div className="line-clamp-1 text-sm text-slate-500">{post.excerpt}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{post.author}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{post.date}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/blog/${post.id}/edit`} className="text-sm text-primary-700 hover:text-primary-800">수정</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
