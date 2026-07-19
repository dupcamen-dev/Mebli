"use client";

import { useState, useEffect } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center bg-tertiary text-on-tertiary shadow-[0_4px_20px_rgba(0,0,0,0.25)] rounded-full hover:bg-tertiary/85 transition-all duration-300 cursor-pointer"
      aria-label="Нагору"
    >
      <span className="material-symbols-outlined text-[22px]">
        arrow_upward
      </span>
    </button>
  );
}
