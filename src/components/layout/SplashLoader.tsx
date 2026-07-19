"use client";

import { useState, useEffect, useRef } from "react";

export function SplashLoader() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    const img = new Image();
    img.src = "/hero.webp";

    const hide = () => {
      const elapsed = Date.now() - mountedAt.current;
      const remaining = Math.max(0, 500 - elapsed);
      setTimeout(() => setFading(true), remaining);
      setTimeout(() => setHidden(false), remaining + 500);
    };

    if (img.complete) {
      hide();
    } else {
      img.addEventListener("load", hide);
    }

    const fallback = setTimeout(hide, 5000);

    return () => {
      img.removeEventListener("load", hide);
      clearTimeout(fallback);
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
            className="h-full bg-secondary transition-all duration-[1200ms] ease-out"
            style={{ width: fading ? "100%" : "70%" }}
          />
        </div>

        <span className="text-[12px] uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant">
          Завантаження
        </span>
      </div>
    </div>
  );
}
