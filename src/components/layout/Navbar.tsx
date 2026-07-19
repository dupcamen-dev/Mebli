"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-[0_1px_0_0_var(--color-outline-variant)]"
          : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center max-w-[1600px] mx-auto px-5 md:px-8 h-[76px]">
        <Link
          href="/"
          className={`font-[family-name:var(--font-headline)] text-[24px] font-semibold tracking-tight transition-colors duration-500 ${
            scrolled ? "text-primary" : "text-white"
          }`}
        >
          Mebli Chortciv
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
          className={`hidden md:inline-flex px-7 py-3 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] transition-all duration-300 cursor-pointer ${
            scrolled
              ? "bg-secondary text-on-secondary hover:bg-secondary/85"
              : "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm"
          }`}
        >
          Замовити проект
        </a>

        <button
          className={`md:hidden transition-colors ${scrolled ? "text-primary" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          <span className="material-symbols-outlined text-[30px]">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-outline-variant bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col px-8 py-8 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-on-surface-variant hover:text-secondary hover:bg-surface-container-low transition-all py-3.5 px-5 cursor-pointer text-[16px]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="mt-4 bg-secondary text-on-secondary px-7 py-4 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] text-center hover:bg-secondary/85 transition-colors cursor-pointer"
            >
              Замовити проект
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
