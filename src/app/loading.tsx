"use client";

import { useState, useEffect } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [
      { target: 30, delay: 100 },
      { target: 55, delay: 300 },
      { target: 75, delay: 500 },
      { target: 90, delay: 800 },
      { target: 98, delay: 1200 },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach(({ target, delay }) => {
      timers.push(
        setTimeout(() => {
          setProgress(target);
        }, delay)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
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
