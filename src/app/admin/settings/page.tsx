"use client";

import { useState, useEffect } from "react";

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
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-5 block">
            Налаштування
          </span>
          <h1 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] text-primary">
            Telegram бот
          </h1>
        </div>
        <a
          href="/admin"
          className="text-[14px] font-medium text-on-surface-variant hover:text-secondary transition-colors"
        >
          ← Назад
        </a>
      </div>

      <div className="max-w-xl bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg p-10">
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
          </div>
          <button
            onClick={save}
            className="w-full bg-secondary text-on-secondary px-10 py-5 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] hover:bg-secondary/85 transition-all duration-300 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] cursor-pointer"
          >
            {saved ? "✓ Збережено" : "Зберегти"}
          </button>
        </div>
      </div>
    </div>
  );
}
