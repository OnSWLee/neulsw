import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}

function AdminDashboard() {
  const { isAuthenticated, isAdmin, token } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
      return;
    }

    fetchPosts();
  }, [isAuthenticated, isAdmin, navigate]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog?limit=100", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("블로그 포스트를 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("삭제에 실패했습니다.");
      }

      fetchPosts(); // 목록 새로고침
    } catch (error) {
      console.error("삭제 오류:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-20">
        <div className="text-slate-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">관리자 대시보드</h1>
          <Link
            to="/admin/blog/new"
            className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
          >
            새 글 작성
          </Link>
        </div>

        <div className="rounded-lg bg-cream-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    제목
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    작성자
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    날짜
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{post.title}</div>
                      <div className="text-sm text-slate-500 line-clamp-1">
                        {post.excerpt}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {post.author}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{post.date}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/blog/${post.id}/edit`}
                          className="text-sm text-primary-700 hover:text-primary-800"
                        >
                          수정
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          삭제
                        </button>
                      </div>
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

export default AdminDashboard;


