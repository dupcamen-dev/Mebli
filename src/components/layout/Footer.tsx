"use client";

import Link from "next/link";
import { useContent } from "@/contexts/ContentContext";
import { useCategories } from "@/hooks/useCategories";

export function Footer() {
  const { content } = useContent();
  const { categories } = useCategories();
  const c = content.footer;
  return (
    <footer className="w-full mt-auto bg-inverse-surface text-inverse-on-surface">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14">
          <div className="md:col-span-5">
            <div className="font-[family-name:var(--font-headline)] text-[26px] font-medium text-white mb-5">
              {c.brand}
            </div>
            <p className="text-[16px] leading-[1.7] text-inverse-on-surface/60 max-w-sm mb-10">
              {c.description}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/mebli_chortkiv/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center border border-white/10 hover:border-tertiary hover:bg-tertiary/10 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-[20px] h-[20px] fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://www.facebook.com/people/Mebli-Chortkiv/100064029790423/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center border border-white/10 hover:border-tertiary hover:bg-tertiary/10 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-[20px] h-[20px] fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.tiktok.com/@meblichortkiv"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center border border-white/10 hover:border-tertiary hover:bg-tertiary/10 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-[18px] h-[18px] fill-white" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.38-6.22V9.4a8.16 8.16 0 0 0 4.84 1.58V7.53a4.85 4.85 0 0 1-1-.84z"/></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-white/40 block mb-7">
              {c.categoriesHeading}
            </span>
            <ul className="flex flex-col gap-4">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-[16px] leading-[1.6] text-inverse-on-surface/60 hover:text-white transition-colors duration-300"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-white/40 block mb-7">
              {c.navigationHeading}
            </span>
            <ul className="flex flex-col gap-4 mb-10">
              <li>
                <a href="#reviews" className="text-[16px] text-inverse-on-surface/60 hover:text-white transition-colors duration-300">
                  {content.navbar.links[2]?.label || "Відгуки"}
                </a>
              </li>
              <li>
                <a href="#process" className="text-[16px] text-inverse-on-surface/60 hover:text-white transition-colors duration-300">
                  {content.navbar.links[0]?.label || "Процес"}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[16px] text-inverse-on-surface/60 hover:text-white transition-colors duration-300">
                  {content.navbar.links[3]?.label || "Контакти"}
                </a>
              </li>
              <li>
                <Link href="/track" className="text-[16px] text-inverse-on-surface/60 hover:text-white transition-colors duration-300">
                  {c.tracking}
                </Link>
              </li>
            </ul>
            <p className="text-[14px] text-inverse-on-surface/30">
              &copy; {new Date().getFullYear()} {c.brand}. Всі права захищені.
            </p>
            <p className="text-[14px] text-inverse-on-surface/30 mt-3">
              <a href="https://millionpixels.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">{c.credit}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
