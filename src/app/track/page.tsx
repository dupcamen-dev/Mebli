"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const STATUS_INFO: Record<string, { label: string; icon: string; color: string }> = {
  new: { label: "Новий", icon: "new_releases", color: "text-tertiary" },
  in_progress: { label: "В роботі", icon: "engineering", color: "text-secondary" },
  completed: { label: "Виконано", icon: "check_circle", color: "text-green-600" },
  cancelled: { label: "Скасовано", icon: "cancel", color: "text-red-600" },
};

function TrackContent() {
  const searchParams = useSearchParams();
  const [id, setId] = useState(searchParams.get("id") || "");
  const [found, setFound] = useState<null | { status: string; createdAt: string; name: string; message: string }>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const paramId = searchParams.get("id");
    if (paramId) {
      setId(paramId);
      lookup(paramId);
    }
  }, [searchParams]);

  const lookup = (orderId: string) => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const order = orders.find((o: { id: string }) => o.id === orderId);
    setFound(order || false);
    setSearched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookup(id);
  };

  return (
    <section className="py-28 md:py-44 min-h-[70vh]">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="max-w-xl mx-auto text-center mb-16">
          <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-5 block">
            Відстеження
          </span>
          <h1 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] text-primary mb-7">
            Перевірте статус
          </h1>
          <p className="text-[16px] leading-[1.7] text-on-surface-variant">
            Введіть номер замовлення, щоб дізнатись його статус.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-16">
          <div className="flex gap-3">
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="MC-XXXXXXXXX"
              className="flex-1 border border-outline-variant bg-white/70 backdrop-blur-xl px-5 py-4 text-[16px] leading-[1.6] text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary transition-colors duration-300 rounded-lg"
            />
            <button
              type="submit"
              className="bg-secondary text-on-secondary px-8 py-4 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] hover:bg-secondary/85 transition-all duration-300 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] cursor-pointer"
            >
              Знайти
            </button>
          </div>
        </form>

        {searched && (
          <div className="max-w-xl mx-auto">
            {found ? (
              <div className="bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg p-10 text-center">
                <span className="material-symbols-outlined text-[56px] text-secondary mb-4 block">
                  {STATUS_INFO[found.status]?.icon || "help"}
                </span>
                <h3 className="font-[family-name:var(--font-headline)] text-[24px] font-medium text-primary mb-2">
                  Замовлення {found.name}
                </h3>
                <span className={`text-[15px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] ${STATUS_INFO[found.status]?.color || ""}`}>
                  {STATUS_INFO[found.status]?.label || found.status}
                </span>
                {found.message && (
                  <p className="text-[14px] text-on-surface-variant mt-4">{found.message}</p>
                )}
                <p className="text-[13px] text-on-surface-variant mt-4">
                  Створено: {new Date(found.createdAt).toLocaleString("uk-UA")}
                </p>
              </div>
            ) : (
              <div className="bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg p-10 text-center">
                <span className="material-symbols-outlined text-[56px] text-outline mb-4 block">search_off</span>
                <h3 className="font-[family-name:var(--font-headline)] text-[24px] font-medium text-primary mb-2">
                  Не знайдено
                </h3>
                <p className="text-[15px] text-on-surface-variant">
                  Замовлення з таким номером не існує або було видалено.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="py-28 text-center text-on-surface-variant">Завантаження...</div>}>
      <TrackContent />
    </Suspense>
  );
}
