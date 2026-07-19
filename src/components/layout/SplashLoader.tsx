"use client";

import { useState, useEffect } from "react";

export function SplashLoader() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [bar, setBar] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const barTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / 3000) * 100);
      setBar(pct);
    }, 30);

    const fadeTimer = setTimeout(() => {
      clearInterval(barTimer);
      setBar(100);
      setFading(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setHidden(false);
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
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
