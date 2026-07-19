"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AuthButton } from "@/components/layout/AuthButton";

const navLinks = [
  { href: "#process", label: "Процес" },
  { href: "#categories", label: "Категорії" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#contact", label: "Контакти" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${
        scrolled && !mobileOpen
          ? "bg-background/90 backdrop-blur-xl shadow-[0_1px_0_0_var(--color-outline-variant)]"
          : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center max-w-[1600px] mx-auto px-5 md:px-8 h-[76px]">
        <Link
          href="/"
          className={`font-[family-name:var(--font-headline)] text-[24px] font-semibold tracking-tight transition-colors duration-500 relative z-[61] ${
            mobileOpen ? "text-white" : scrolled ? "text-primary" : "text-white"
          }`}
        >
          Mebli Chortkiv
        </Link>

        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`text-[16px] font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
                scrolled
                  ? "text-on-surface-variant hover:text-secondary"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => handleClick(e, "#contact")}
          className={`hidden md:inline-flex px-7 py-3 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] transition-all duration-300 cursor-pointer rounded-lg ${
            scrolled
              ? "bg-secondary text-on-secondary hover:bg-secondary/85 shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
              : "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
          }`}
        >
          Замовити проект
        </a>

        <AuthButton />

        <button
          className="md:hidden transition-colors text-white relative z-[61]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          <span className="material-symbols-outlined text-[30px]">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      <div
        className={`md:hidden fixed inset-0 top-0 bg-green-section transition-all duration-500 ease-in-out ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full px-8 gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-white hover:text-tertiary transition-colors duration-300 cursor-pointer font-[family-name:var(--font-headline)] text-[24px] font-medium py-3"
              style={{
                transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.4s ease, transform 0.4s ease, color 0.3s ease",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="mt-6 bg-white text-green-section px-10 py-4 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] hover:bg-white/90 transition-all duration-300 cursor-pointer rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 80}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.4s ease, transform 0.4s ease, background-color 0.3s ease",
            }}
          >
            Замовити проект
          </a>
        </div>
      </div>
    </header>
  );
}
