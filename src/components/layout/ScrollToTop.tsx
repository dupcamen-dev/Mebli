"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/contexts/ContentContext";

export function ScrollToTop() {
  const { content } = useContent();
  const c = content.scrollToTop;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
      <button
        onClick={() => {
          const el = document.getElementById("contact");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="w-12 h-12 flex items-center justify-center bg-secondary text-on-secondary shadow-[0_4px_20px_rgba(0,0,0,0.25)] rounded-full hover:bg-secondary/85 transition-all duration-300 cursor-pointer"
        aria-label={c.contactsLabel}
      >
        <span className="material-symbols-outlined text-[22px]">
          chat
        </span>
      </button>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-12 h-12 flex items-center justify-center bg-tertiary text-on-tertiary shadow-[0_4px_20px_rgba(0,0,0,0.25)] rounded-full hover:bg-tertiary/85 transition-all duration-300 cursor-pointer"
        aria-label={c.topLabel}
      >
        <span className="material-symbols-outlined text-[22px]">
          arrow_upward
        </span>
      </button>
    </div>
  );
}
