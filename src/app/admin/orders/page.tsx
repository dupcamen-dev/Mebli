"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Order } from "@/lib/types";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "Новий", color: "bg-tertiary text-on-tertiary" },
  in_progress: { label: "В роботі", color: "bg-secondary text-on-secondary" },
  completed: { label: "Виконано", color: "bg-green-600 text-white" },
  cancelled: { label: "Скасовано", color: "bg-red-600 text-white" },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  const updateStatus = (id: string, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const removeOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <section className="py-28 md:py-44 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-5 block">
              Замовлення
            </span>
            <h1 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] text-primary">
              Всі замовлення <span className="text-on-surface-variant text-[28px] md:text-[36px]">({orders.length})</span>
            </h1>
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-2 text-[14px] font-medium text-on-surface-variant hover:text-secondary transition-colors self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Назад
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg p-16 text-center">
            <span className="material-symbols-outlined text-[56px] text-outline mb-4 block">inbox</span>
            <p className="text-[18px] text-on-surface-variant">Замовлень поки немає.</p>
            <p className="text-[14px] text-on-surface-variant mt-2">
              Коли користувачі надішлють заявку, вони з&apos;являться тут.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = STATUS_LABELS[order.status] || STATUS_LABELS.new;
              return (
                <div
                  key={order.id}
                  className="bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg p-8 transition-all duration-300 hover:bg-white/80"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px] text-secondary">person</span>
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-headline)] text-[18px] font-medium text-primary">
                          {order.name}
                        </h3>
                        <p className="text-[14px] text-on-surface-variant">
                          {order.phone} {order.email ? `· ${order.email}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-14 md:ml-0">
                      <span className={`px-3 py-1 text-[12px] font-bold uppercase tracking-wider rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                      <span className="text-[13px] text-on-surface-variant whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleString("uk-UA")}
                      </span>
                    </div>
                  </div>
                  {order.message && (
                    <p className="text-[15px] text-on-surface-variant mb-5 ml-14 md:ml-0 leading-relaxed">
                      {order.message}
                    </p>
                  )}
                  <div className="flex items-center gap-3 ml-14 md:ml-0 border-t border-outline-variant/30 pt-5">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                      className="text-[13px] font-medium border border-outline-variant rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:border-secondary transition-colors cursor-pointer"
                    >
                      <option value="new">Новий</option>
                      <option value="in_progress">В роботі</option>
                      <option value="completed">Виконано</option>
                      <option value="cancelled">Скасовано</option>
                    </select>
                    <button
                      onClick={() => removeOrder(order.id)}
                      className="flex items-center gap-1.5 text-[13px] font-medium text-red-500 hover:text-red-700 transition-colors cursor-pointer px-3 py-2.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      Видалити
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
