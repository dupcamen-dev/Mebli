"use client";

import { useState, useEffect, useRef } from "react";

export function SplashLoader() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [bar, setBar] = useState(0);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    const barTimer = setInterval(() => {
      const elapsed = Date.now() - mountedAt.current;
      const pct = Math.min(70, (elapsed / 3000) * 70);
      setBar(pct);
    }, 30);

    const img = new Image();
    img.src = "/hero.webp";

    const hide = () => {
      const elapsed = Date.now() - mountedAt.current;
      const remaining = Math.max(0, 3000 - elapsed);
      setTimeout(() => {
        setBar(100);
        setFading(true);
      }, remaining);
      setTimeout(() => setHidden(false), remaining + 500);
    };

    if (img.complete) {
      hide();
    } else {
      img.addEventListener("load", hide);
    }

    const fallback = setTimeout(hide, 6000);

    return () => {
      img.removeEventListener("load", hide);
      clearTimeout(fallback);
      clearInterval(barTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="font-[family-name:var(--font-headline)] text-[28px] font-semibold tracking-tight text-primary">
          Mebli Chortkiv
        </div>

        <div className="w-[240px] h-[2px] bg-surface-container-high overflow-hidden">
          <div
            className="h-full bg-secondary transition-all duration-500 ease-out"
            style={{ width: `${bar}%` }}
          />
        </div>

        <span className="text-[12px] uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant">
          Завантаження
        </span>
      </div>
    </div>
  );
}
