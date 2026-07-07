import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../src/contexts/AuthContext";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
      setError("생년월일은 YYYY-MM-DD 형식으로 입력해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      await register(username, password, name, birthDate);
      await router.push("/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-8 px-6 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900">회원가입</h1>
        <p className="mt-2 text-sm text-slate-600">치료 후기를 보려면 회원가입이 필요합니다.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <input className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" placeholder="아이디" value={username} onChange={(e)=>setUsername(e.target.value)} required />
        <input className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" placeholder="비밀번호" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <input className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" placeholder="이름" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" type="date" value={birthDate} onChange={(e)=>setBirthDate(e.target.value)} required />
        <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50">
          {isLoading ? "가입 중..." : "회원가입"}
        </button>
      </form>
      <div className="text-center text-sm text-slate-600">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-semibold text-primary-700 hover:text-primary-800">
          로그인
        </Link>
      </div>
    </div>
  );
}
