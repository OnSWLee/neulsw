import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAuth } from "../contexts/AuthContext";

const links = [
  { to: "/doctor", label: "이승욱 About me" },
  { to: "/blog", label: "블로그 Blog" },
  { to: "/clinics", label: "치유 Clinics" },
  { to: "/reviews", label: "후기 Story" }
];

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

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
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/images/Logo.png" 
            alt="늘품한의원 로고" 
            className="h-12 w-12 object-contain"
          />
          <div className="text-2xl font-semibold text-slate-900">
            늘품한의원
          </div>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8 text-sm text-slate-700">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  clsx(
                    "transition hover:text-slate-900",
                    isActive ||
                      (link.to !== "/" && location.pathname.startsWith(link.to))
                      ? "text-slate-900 font-medium"
                      : "text-slate-600"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  관리자
                </Link>
              )}
              <span className="text-sm text-slate-600">{user?.name}님</span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;





