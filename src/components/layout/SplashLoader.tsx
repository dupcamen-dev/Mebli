"use client";

import { useState, useEffect } from "react";

export function SplashLoader() {
  const [hidden, setHidden] = useState(false);
  const [bar, setBar] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const barTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / 3000) * 100);
      setBar(pct);
    }, 30);

    const hideTimer = setTimeout(() => {
      clearInterval(barTimer);
      setHidden(true);
    }, 3000);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(barTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        <div className="font-[family-name:var(--font-headline)] text-[28px] font-semibold tracking-tight text-primary">
          Mebli Chortkiv
        </div>

        <div className="w-[240px] h-[2px] bg-surface-container-high overflow-hidden">
          <div
            className="h-full bg-secondary transition-[width] duration-300 ease-out"
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
