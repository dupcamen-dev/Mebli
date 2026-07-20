"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const navLinks = [
  { href: "#process", label: "Процес" },
  { href: "#categories", label: "Категорії" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#contact", label: "Контакти" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isInnerPage = pathname !== "/";
  const isAdmin = (session?.user as { isAdmin?: boolean })?.isAdmin;

  const showScrolled = scrolled || isInnerPage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const close = () => setMobileOpen(false);

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${
        showScrolled && !mobileOpen
          ? "bg-background/90 backdrop-blur-xl shadow-[0_1px_0_0_var(--color-outline-variant)]"
          : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center max-w-[1600px] mx-auto px-5 md:px-8 h-[76px]">
        <div className="flex items-center gap-4">
          {isInnerPage && (
            <Link
              href="/"
              className={`hidden md:flex items-center gap-1.5 text-[14px] font-medium transition-colors duration-300 ${
                showScrolled ? "text-on-surface-variant hover:text-secondary" : "text-white/70 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              На сайт
            </Link>
          )}
          <Link
            href="/"
            className={`font-[family-name:var(--font-headline)] text-[24px] font-semibold tracking-tight transition-colors duration-500 relative z-[61] ${
              mobileOpen ? "text-white" : showScrolled ? "text-primary" : "text-white"
            }`}
          >
            Mebli Chortkiv
          </Link>
        </div>

        <div className="hidden md:flex gap-10 items-center">
          {!isInnerPage && navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`text-[16px] font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
                showScrolled ? "text-on-surface-variant hover:text-secondary" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          {isAdmin && (
            <Link href="/admin" className={`text-[16px] font-medium tracking-wide transition-colors duration-300 ${showScrolled ? "text-secondary hover:text-secondary/80" : "text-white/70 hover:text-white"}`}>
              Адмін
            </Link>
          )}
          <Link href="/track" className={`text-[16px] font-medium tracking-wide transition-colors duration-300 ${showScrolled ? "text-on-surface-variant hover:text-secondary" : "text-white/70 hover:text-white"}`}>
            Відстеження
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAdmin && (
            <Link href="/admin" className={`px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] transition-all duration-300 rounded-lg ${showScrolled ? "bg-secondary text-on-secondary hover:bg-secondary/85 shadow-[0_2px_12px_rgba(0,0,0,0.15)]" : "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.2)]"}`}>
              Адмін
            </Link>
          )}
          {!isInnerPage && (
            <a href="#contact" onClick={(e) => handleClick(e, "#contact")} className={`px-7 py-3 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] transition-all duration-300 cursor-pointer rounded-lg ${showScrolled ? "bg-secondary text-on-secondary hover:bg-secondary/85 shadow-[0_2px_12px_rgba(0,0,0,0.15)]" : "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.2)]"}`}>
              Замовити проект
            </a>
          )}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3 ml-3">
          {session ? (
            <div className="flex items-center gap-3">
              {session.user?.image && <img src={session.user.image} alt="" className="w-8 h-8 rounded-full border border-outline-variant" />}
              <button onClick={() => signOut()} className={`text-[14px] font-medium transition-colors cursor-pointer ${showScrolled ? "text-on-surface-variant hover:text-secondary" : "text-white/70 hover:text-white"}`}>
                Вийти
              </button>
            </div>
          ) : (
            <button onClick={() => signIn("google")} className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.1em] font-[family-name:var(--font-body)] border transition-all duration-300 cursor-pointer rounded-lg ${showScrolled ? "border-outline-variant text-on-surface hover:bg-surface-container-low hover:border-secondary" : "border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"}`}>
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Увійти
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden transition-colors relative z-[61] ${mobileOpen ? "text-white" : showScrolled ? "text-primary" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          <span className="material-symbols-outlined text-[30px]">{mobileOpen ? "close" : "menu"}</span>
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`md:hidden fixed inset-0 top-0 bg-green-section transition-all duration-500 ease-in-out ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col items-center h-full px-8 pt-[100px] pb-10 overflow-y-auto">
          <div className="flex flex-col items-center gap-2">
            {!isInnerPage && navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-white hover:text-tertiary transition-colors duration-300 cursor-pointer font-[family-name:var(--font-headline)] text-[24px] font-medium py-3"
                style={{ transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.4s ease, transform 0.4s ease, color 0.3s ease" }}
              >
                {link.label}
              </a>
            ))}

            {isAdmin && (
              <Link href="/admin" onClick={close} className="text-tertiary hover:text-white transition-colors duration-300 font-[family-name:var(--font-headline)] text-[24px] font-medium py-3"
                style={{ transitionDelay: mobileOpen ? `${navLinks.length * 80}ms` : "0ms", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.4s ease, transform 0.4s ease, color 0.3s ease" }}>
                Адмін панель
              </Link>
            )}

            <Link href="/track" onClick={close} className="text-tertiary hover:text-white transition-colors duration-300 font-[family-name:var(--font-headline)] text-[24px] font-medium py-3"
              style={{ transitionDelay: mobileOpen ? `${(navLinks.length + 1) * 80}ms` : "0ms", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.4s ease, transform 0.4s ease, color 0.3s ease" }}>
              Відстеження
            </Link>

            {!isInnerPage && (
              <a href="#contact" onClick={(e) => handleClick(e, "#contact")} className="mt-6 bg-white text-green-section px-10 py-4 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] hover:bg-white/90 transition-all duration-300 cursor-pointer rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                style={{ transitionDelay: mobileOpen ? `${(navLinks.length + 2) * 80}ms` : "0ms", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.4s ease, transform 0.4s ease, background-color 0.3s ease" }}>
                Замовити проект
              </a>
            )}
          </div>

          {/* Mobile auth section at bottom */}
          <div className="mt-auto pt-8 w-full max-w-[280px]" style={{ transitionDelay: mobileOpen ? `${(navLinks.length + 3) * 80}ms` : "0ms", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}>
            {session ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  {session.user?.image && <img src={session.user.image} alt="" className="w-10 h-10 rounded-full border-2 border-white/30" />}
                  <span className="text-white text-[15px] font-medium">{session.user?.name}</span>
                </div>
                <button onClick={() => { signOut(); close(); }} className="w-full border border-white/30 text-white px-6 py-3.5 text-[14px] font-bold uppercase tracking-[0.1em] font-[family-name:var(--font-body)] hover:bg-white/10 transition-all duration-300 cursor-pointer rounded-lg backdrop-blur-sm">
                  Вийти
                </button>
              </div>
            ) : (
              <button onClick={() => { signIn("google"); close(); }} className="w-full flex items-center justify-center gap-2.5 bg-white text-green-section px-6 py-3.5 text-[14px] font-bold uppercase tracking-[0.1em] font-[family-name:var(--font-body)] hover:bg-white/90 transition-all duration-300 cursor-pointer rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Увійти через Google
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
