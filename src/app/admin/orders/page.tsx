"use client";

import { useState, useEffect } from "react";
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
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-5 block">
            Замовлення
          </span>
          <h1 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] text-primary">
            Всі замовлення ({orders.length})
          </h1>
        </div>
        <a
          href="/admin"
          className="text-[14px] font-medium text-on-surface-variant hover:text-secondary transition-colors"
        >
          ← Назад
        </a>
      </div>

      {orders.length === 0 ? (
        <p className="text-[16px] text-on-surface-variant">Замовлень поки немає.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = STATUS_LABELS[order.status] || STATUS_LABELS.new;
            return (
              <div
                key={order.id}
                className="bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-headline)] text-[20px] font-medium text-primary">
                      {order.name}
                    </h3>
                    <p className="text-[14px] text-on-surface-variant mt-1">
                      {order.phone} {order.email ? `· ${order.email}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-[12px] font-bold uppercase tracking-wider rounded-full ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="text-[13px] text-on-surface-variant">
                      {new Date(order.createdAt).toLocaleString("uk-UA")}
                    </span>
                  </div>
                </div>
                {order.message && (
                  <p className="text-[15px] text-on-surface-variant mb-4">{order.message}</p>
                )}
                <div className="flex gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                    className="text-[13px] border border-outline-variant rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-secondary transition-colors cursor-pointer"
                  >
                    <option value="new">Новий</option>
                    <option value="in_progress">В роботі</option>
                    <option value="completed">Виконано</option>
                    <option value="cancelled">Скасовано</option>
                  </select>
                  <button
                    onClick={() => removeOrder(order.id)}
                    className="text-[13px] text-red-600 hover:text-red-800 transition-colors cursor-pointer px-3 py-2"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
