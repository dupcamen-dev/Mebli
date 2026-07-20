"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminSettings() {
  const [settings, setSettings] = useState({ botToken: "", chatId: "", configured: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-28 md:py-44 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="flex flex-col gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-4 md:mb-5 block">
              Налаштування
            </span>
            <h1 className="font-[family-name:var(--font-headline)] text-[30px] md:text-[48px] font-medium leading-[1.15] text-primary">
              Telegram бот
            </h1>
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-2 text-[14px] font-medium text-on-surface-variant hover:text-secondary transition-colors self-start"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Назад
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Current status */}
          <div className="bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg p-7 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-secondary">chat</span>
              </div>
              <h2 className="font-[family-name:var(--font-headline)] text-[18px] md:text-[20px] font-medium text-primary">
                Поточний статус
              </h2>
            </div>

            {loading ? (
              <p className="text-[15px] text-on-surface-variant">Завантаження...</p>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${settings.configured ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="text-[15px] font-medium text-on-surface">
                    {settings.configured ? "Підключено" : "Не налаштовано"}
                  </span>
                </div>

                <div>
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-2">
                    Bot Token
                  </span>
                  <code className="text-[14px] text-on-surface bg-surface px-4 py-2.5 rounded-lg block font-mono">
                    {settings.botToken || "— не встановлено —"}
                  </code>
                </div>

                <div>
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-2">
                    Chat ID
                  </span>
                  <code className="text-[14px] text-on-surface bg-surface px-4 py-2.5 rounded-lg block font-mono">
                    {settings.chatId || "— не встановлено —"}
                  </code>
                </div>
              </div>
            )}
          </div>

          {/* Setup guide */}
          <div className="bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg p-7 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-secondary">info</span>
              </div>
              <h2 className="font-[family-name:var(--font-headline)] text-[18px] md:text-[20px] font-medium text-primary">
                Як налаштувати
              </h2>
            </div>
            <ol className="space-y-5 text-[14px] md:text-[15px] leading-[1.7] text-on-surface-variant">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-[12px] font-bold text-secondary flex-shrink-0 mt-0.5">1</span>
                <span>Відкрийте <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">@BotFather</a> в Telegram</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-[12px] font-bold text-secondary flex-shrink-0 mt-0.5">2</span>
                <span>Створіть бота командою <code className="bg-surface px-2 py-0.5 rounded text-[13px]">/newbot</code> і скопіюйте токен</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-[12px] font-bold text-secondary flex-shrink-0 mt-0.5">3</span>
                <span>Напишіть боту повідомлення, потім відкрийте URL: <code className="bg-surface px-2 py-0.5 rounded text-[13px] break-all">api.telegram.org/bot{`{TOKEN}`}/getUpdates</code></span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-[12px] font-bold text-secondary flex-shrink-0 mt-0.5">4</span>
                <span>Знайдіть <code className="bg-surface px-2 py-0.5 rounded text-[13px]">chat.id</code> у відповіді</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-[12px] font-bold text-secondary flex-shrink-0 mt-0.5">5</span>
                <span>Додайте змінні в <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Vercel Dashboard</a> → Settings → Environment Variables</span>
              </li>
            </ol>

            <div className="mt-8 bg-surface border border-outline-variant/50 rounded-lg p-5">
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-3">
                Змінні для Vercel
              </span>
              <div className="space-y-2">
                <code className="text-[13px] text-on-surface bg-background px-3 py-2 rounded block font-mono">
                  TELEGRAM_BOT_TOKEN=ваш_токен
                </code>
                <code className="text-[13px] text-on-surface bg-background px-3 py-2 rounded block font-mono">
                  TELEGRAM_CHAT_ID=ваш_chat_id
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
