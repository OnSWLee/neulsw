import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAuth } from "../src/contexts/AuthContext";

const links = [
  { href: "/doctor", label: "이승욱 About me" },
  { href: "/blog", label: "블로그 Blog" },
  { href: "/clinics", label: "치유 Clinics" },
  { href: "/reviews", label: "후기 Story" },
];

export default function NextNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full transition-all",
        scrolled ? "bg-cream-white/95 shadow-sm backdrop-blur" : "bg-cream-white"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/Logo.png" alt="늘품한의원 로고" className="h-12 w-12 object-contain" />
          <div className="text-2xl font-semibold text-slate-900">늘품한의원</div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "transition hover:text-slate-900",
                router.pathname === link.href || (link.href !== "/" && router.pathname.startsWith(link.href))
                  ? "font-medium text-slate-900"
                  : "text-slate-600"
              )}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link href="/admin" className="text-slate-600 transition hover:text-slate-900">
                  관리자
                </Link>
              )}
              <span className="text-slate-600">{user?.name}님</span>
              <button
                type="button"
                className="text-slate-600 transition hover:text-slate-900"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-slate-600 transition hover:text-slate-900">
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
