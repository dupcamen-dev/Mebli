"use client";

import { useState, useEffect } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-primary/80 backdrop-blur-xl text-on-primary px-5 md:px-8 py-5 md:py-6 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="text-[13px] md:text-[14px] leading-[1.6] text-on-primary/70 max-w-2xl">
          Цей сайт використовує файли cookie для покращення вашого досвіду.
          Продовжуючи переглядати сайт, ви погоджуєтесь на їх використання.
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-tertiary text-on-tertiary px-8 py-3 text-[12px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:bg-tertiary/85 transition-all duration-300 cursor-pointer"
        >
          Зрозуміло
        </button>
      </div>
    </div>
  );
}
