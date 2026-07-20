"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminSettings() {
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setBotToken(localStorage.getItem("tg_bot_token") || "");
    setChatId(localStorage.getItem("tg_chat_id") || "");
  }, []);

  const save = () => {
    localStorage.setItem("tg_bot_token", botToken);
    localStorage.setItem("tg_chat_id", chatId);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="py-28 md:py-44 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-5 block">
              Налаштування
            </span>
            <h1 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] text-primary">
              Telegram бот
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg p-10 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-secondary">chat</span>
              </div>
              <h2 className="font-[family-name:var(--font-headline)] text-[20px] font-medium text-primary">
                  Підключення бота
              </h2>
            </div>
            <div className="space-y-8">
              <div>
                <label className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-3">
                  Bot Token
                </label>
                <input
                  type="password"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                  className="w-full border-b border-outline-variant bg-transparent px-0 py-3.5 text-[16px] leading-[1.6] text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary transition-colors duration-300"
                />
                <p className="text-[13px] text-on-surface-variant mt-2">
                  Отримайте у <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">@BotFather</a>
                </p>
              </div>
              <div>
                <label className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-3">
                  Chat ID
                </label>
                <input
                  type="text"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                  placeholder="-1001234567890"
                  className="w-full border-b border-outline-variant bg-transparent px-0 py-3.5 text-[16px] leading-[1.6] text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary transition-colors duration-300"
                />
                <p className="text-[13px] text-on-surface-variant mt-2">
                  ID вашого чату з ботом або групи
                </p>
              </div>
              <button
                onClick={save}
                className="w-full bg-secondary text-on-secondary px-10 py-5 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] hover:bg-secondary/85 transition-all duration-300 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] cursor-pointer"
              >
                {saved ? "✓ Збережено" : "Зберегти"}
              </button>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg p-10 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-secondary">info</span>
              </div>
              <h2 className="font-[family-name:var(--font-headline)] text-[20px] font-medium text-primary">
                Як налаштувати
              </h2>
            </div>
            <ol className="space-y-5 text-[15px] leading-[1.7] text-on-surface-variant">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-[13px] font-bold text-secondary flex-shrink-0 mt-0.5">1</span>
                <span>Відкрийте <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">@BotFather</a> в Telegram</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-[13px] font-bold text-secondary flex-shrink-0 mt-0.5">2</span>
                <span>Створіть нового бота командою <code className="bg-surface px-2 py-0.5 rounded text-[13px]">/newbot</code></span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-[13px] font-bold text-secondary flex-shrink-0 mt-0.5">3</span>
                <span>Скопіюйте отриманий токен та вставте в поле &quot;Bot Token&quot;</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-[13px] font-bold text-secondary flex-shrink-0 mt-0.5">4</span>
                <span>Напишіть боту повідомлення та відкрийте <a href="https://api.telegram.org/bot{TOKEN}/getUpdates" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">цю URL-адресу</a> (замініть TOKEN)</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-[13px] font-bold text-secondary flex-shrink-0 mt-0.5">5</span>
                <span>Знайдіть <code className="bg-surface px-2 py-0.5 rounded text-[13px]">chat.id</code> у відповіді та введіть його в поле &quot;Chat ID&quot;</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
