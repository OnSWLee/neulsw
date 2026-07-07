import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../src/contexts/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(username, password);
      const savedUser = localStorage.getItem("user");
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;
      await router.push(parsedUser?.isAdmin ? "/admin" : "/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-8 px-6 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900">로그인</h1>
        <p className="mt-2 text-sm text-slate-600">치료 후기를 보려면 로그인이 필요합니다.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <div>
          <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">아이디</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>
      <div className="text-center text-sm text-slate-600">
        계정이 없으신가요?{" "}
        <Link href="/register" className="font-semibold text-primary-700 hover:text-primary-800">
          회원가입
        </Link>
      </div>
    </div>
  );
}
