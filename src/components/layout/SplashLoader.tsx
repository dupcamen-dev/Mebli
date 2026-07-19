"use client";

import { useState, useEffect } from "react";

export function SplashLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = "/hero.webp";

    const steps = [
      { target: 40, delay: 150 },
      { target: 65, delay: 400 },
      { target: 80, delay: 700 },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach(({ target, delay }) => {
      timers.push(setTimeout(() => setProgress(target), delay));
    });

    const onLoad = () => {
      setProgress(100);
      timers.push(setTimeout(() => setVisible(false), 600));
    };

    if (img.complete) {
      onLoad();
    } else {
      img.addEventListener("load", onLoad);
    }

    timers.push(setTimeout(onLoad, 4000));

    return () => {
      img.removeEventListener("load", onLoad);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="font-[family-name:var(--font-headline)] text-[28px] font-semibold tracking-tight text-primary">
          Mebli Chortciv
        </div>

        <div className="w-[240px] h-[2px] bg-surface-container-high overflow-hidden">
          <div
            className="h-full bg-secondary transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[12px] uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant">
          Завантаження
        </span>
      </div>
    </div>
  );
}
