import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAuth } from "../src/contexts/AuthContext";

const links = [
  { href: "/doctor", label: "이승욱 About me" },
  { href: "/blog", label: "블로그 Blog" },
  { href: "/clinics", label: "치유 Clinics" },
];

export default function NextNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isAdmin, user, logout, isAuthReady } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  const isActive = (href: string) =>
    router.pathname === href || (href !== "/" && router.pathname.startsWith(href));

  const authLinks = !isAuthReady ? (
    <span className="text-slate-400"> </span>
  ) : isAuthenticated ? (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      {isAdmin && (
        <Link href="/admin" className="text-slate-600 transition hover:text-slate-900">
          관리자
        </Link>
      )}
      <span className="text-slate-600">{user?.name}님</span>
      <button
        type="button"
        className="text-left text-slate-600 transition hover:text-slate-900 md:text-center"
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
  );

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
                isActive(link.href) ? "font-medium text-slate-900" : "text-slate-600"
              )}
            >
              {link.label}
            </Link>
          ))}
          {authLinks}
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
          {menuOpen ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
      {menuOpen && (
        <nav className="border-t border-slate-200 bg-cream-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "transition hover:text-slate-900",
                  isActive(link.href) ? "font-medium text-slate-900" : "text-slate-600"
                )}
              >
                {link.label}
              </Link>
            ))}
            {authLinks}
          </div>
        </nav>
      )}
    </header>
  );
}
