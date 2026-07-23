"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContent } from "@/contexts/ContentContext";

const SECTIONS = [
  { key: "hero", label: "Головний банер", icon: "space_dashboard" },
  { key: "process", label: "Процес", icon: "settings_suggest" },
  { key: "categories", label: "Категорії", icon: "category" },
  { key: "reviews", label: "Відгуки", icon: "reviews" },
  { key: "contact", label: "Контакти", icon: "mail" },
  { key: "navbar", label: "Навігація", icon: "menu" },
  { key: "footer", label: "Підвал", icon: "web" },
  { key: "track", label: "Відстеження", icon: "local_shipping" },
  { key: "seo", label: "SEO", icon: "search" },
] as const;

export default function AdminContentPage() {
  const router = useRouter();
  const { content, updateContent, updateArrayItem, saveContent, hasChanges } = useContent();
  const [activeSection, setActiveSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const sectionData = (content[activeSection] || {}) as Record<string, unknown>;

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const ok = await saveContent();
      if (ok) {
        setMessage("Збережено!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Помилка збереження");
      }
    } catch {
      setMessage("Помилка збереження");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="py-28 md:py-44 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="flex flex-col gap-6 mb-10">
          <div>
            <span className="text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-4 block">
              Адмін панель
            </span>
            <h1 className="font-[family-name:var(--font-headline)] text-[30px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-primary mb-4">
              Редагування тексту
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

        {message && (
          <div className={`mb-6 p-4 rounded-lg text-[14px] font-medium ${message === "Збережено!" ? "bg-secondary/10 text-secondary" : "bg-red-500/10 text-red-600"}`}>
            {message}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
                activeSection === s.key
                  ? "bg-secondary text-white shadow-md"
                  : "bg-white/60 text-on-surface-variant hover:bg-white/80 border border-outline-variant/50"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                {s.icon}
              </span>
              {s.label}
            </button>
          ))}
        </div>

        <div className="bg-white/60 backdrop-blur-sm border border-outline-variant/50 rounded-lg p-6 md:p-10">
          {activeSection === "hero" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-headline)] text-[22px] md:text-[28px] font-medium text-primary mb-6">Головний банер</h2>
              <Field label="Підзаголовок" value={sectionData.subtitle as string} onChange={(v) => updateContent("hero", "subtitle", v)} />
              <Field label="Заголовок (рядок 1)" value={sectionData.heading1 as string} onChange={(v) => updateContent("hero", "heading1", v)} />
              <Field label="Акцент (script)" value={sectionData.headingAccent as string} onChange={(v) => updateContent("hero", "headingAccent", v)} />
              <Field label="Заголовок (рядок 2)" value={sectionData.heading2 as string} onChange={(v) => updateContent("hero", "heading2", v)} />
              <TextArea label="Опис" value={sectionData.description as string} onChange={(v) => updateContent("hero", "description", v)} />
              <Field label="Кнопка CTA" value={sectionData.ctaPrimary as string} onChange={(v) => updateContent("hero", "ctaPrimary", v)} />
              <Field label="Кнопка 'Наш процес'" value={sectionData.ctaSecondary as string} onChange={(v) => updateContent("hero", "ctaSecondary", v)} />
            </div>
          )}

          {activeSection === "process" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-headline)] text-[22px] md:text-[28px] font-medium text-primary mb-6">Процес</h2>
              <Field label="Підзаголовок" value={sectionData.subtitle as string} onChange={(v) => updateContent("process", "subtitle", v)} />
              <Field label="Заголовок" value={sectionData.heading as string} onChange={(v) => updateContent("process", "heading", v)} />
              <TextArea label="Опис" value={sectionData.description as string} onChange={(v) => updateContent("process", "description", v)} />
              <div className="mt-8">
                <h3 className="text-[16px] font-medium text-primary mb-4">Кроки</h3>
                {(sectionData.steps as { title: string; description: string }[] || []).map((step, i) => (
                  <div key={i} className="ml-4 mb-4 p-4 border-l-2 border-secondary/30 space-y-3">
                    <span className="text-[12px] text-secondary font-bold uppercase">Крок {i + 1}</span>
                    <Field label="Назва" value={step.title} onChange={(v) => updateArrayItem("process", "steps", i, "title", v)} />
                    <TextArea label="Опис" value={step.description} onChange={(v) => updateArrayItem("process", "steps", i, "description", v)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "categories" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-headline)] text-[22px] md:text-[28px] font-medium text-primary mb-6">Категорії</h2>
              <Field label="Підзаголовок" value={sectionData.subtitle as string} onChange={(v) => updateContent("categories", "subtitle", v)} />
              <Field label="Заголовок" value={sectionData.heading as string} onChange={(v) => updateContent("categories", "heading", v)} />
              <TextArea label="Опис" value={sectionData.description as string} onChange={(v) => updateContent("categories", "description", v)} />
              <p className="text-[13px] text-on-surface-variant mt-4">Назви та описи категорій редагуються в розділі &quot;Фото&quot; → вкладка категорії.</p>
            </div>
          )}

          {activeSection === "reviews" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-headline)] text-[22px] md:text-[28px] font-medium text-primary mb-6">Відгуки</h2>
              <Field label="Підзаголовок" value={sectionData.subtitle as string} onChange={(v) => updateContent("reviews", "subtitle", v)} />
              <Field label="Заголовок" value={sectionData.heading as string} onChange={(v) => updateContent("reviews", "heading", v)} />
              <TextArea label="Опис" value={sectionData.description as string} onChange={(v) => updateContent("reviews", "description", v)} />

              <div className="mt-8">
                <h3 className="text-[16px] font-medium text-primary mb-4">Відгуки клієнтів</h3>
                {(sectionData.items as { name: string; location: string; project: string; text: string }[] || []).map((item, i) => (
                  <div key={i} className="ml-4 mb-6 p-4 border-l-2 border-secondary/30 space-y-3">
                    <span className="text-[12px] text-secondary font-bold uppercase">Відгук {i + 1}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Field label="Ім'я" value={item.name} onChange={(v) => updateArrayItem("reviews", "items", i, "name", v)} />
                      <Field label="Місто" value={item.location} onChange={(v) => updateArrayItem("reviews", "items", i, "location", v)} />
                      <Field label="Проект" value={item.project} onChange={(v) => updateArrayItem("reviews", "items", i, "project", v)} />
                    </div>
                    <TextArea label="Текст відгуку" value={item.text} onChange={(v) => updateArrayItem("reviews", "items", i, "text", v)} />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-[16px] font-medium text-primary mb-4">Статистика</h3>
                {(sectionData.stats as { value: string; label: string }[] || []).map((stat, i) => (
                  <div key={i} className="ml-4 mb-3 grid grid-cols-2 gap-3">
                    <Field label="Значення" value={stat.value} onChange={(v) => updateArrayItem("reviews", "stats", i, "value", v)} />
                    <Field label="Підпис" value={stat.label} onChange={(v) => updateArrayItem("reviews", "stats", i, "label", v)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-headline)] text-[22px] md:text-[28px] font-medium text-primary mb-6">Контакти</h2>
              <Field label="Підзаголовок" value={sectionData.subtitle as string} onChange={(v) => updateContent("contact", "subtitle", v)} />
              <Field label="Заголовок" value={sectionData.heading as string} onChange={(v) => updateContent("contact", "heading", v)} />
              <TextArea label="Опис" value={sectionData.description as string} onChange={(v) => updateContent("contact", "description", v)} />

              <div className="mt-8">
                <h3 className="text-[16px] font-medium text-primary mb-4">Контактна інформація</h3>
                <div className="space-y-4 ml-4">
                  <Field label="Адреса (підпис)" value={sectionData.addressLabel as string} onChange={(v) => updateContent("contact", "addressLabel", v)} />
                  <Field label="Адреса" value={sectionData.address as string} onChange={(v) => updateContent("contact", "address", v)} />
                  <Field label="Телефон (підпис)" value={sectionData.phoneLabel as string} onChange={(v) => updateContent("contact", "phoneLabel", v)} />
                  <Field label="Телефон" value={sectionData.phone as string} onChange={(v) => updateContent("contact", "phone", v)} />
                  <Field label="Email (підпис)" value={sectionData.emailLabel as string} onChange={(v) => updateContent("contact", "emailLabel", v)} />
                  <Field label="Email" value={sectionData.email as string} onChange={(v) => updateContent("contact", "email", v)} />
                  <Field label="Соцмережі (підпис)" value={sectionData.socialLabel as string} onChange={(v) => updateContent("contact", "socialLabel", v)} />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-[16px] font-medium text-primary mb-4">Форма</h3>
                <div className="space-y-4 ml-4">
                  <Field label="Мітка 'Ім'я'" value={sectionData.formNameLabel as string} onChange={(v) => updateContent("contact", "formNameLabel", v)} />
                  <Field label="Placeholder 'Ім'я'" value={sectionData.formNamePlaceholder as string} onChange={(v) => updateContent("contact", "formNamePlaceholder", v)} />
                  <Field label="Мітка 'Телефон'" value={sectionData.formPhoneLabel as string} onChange={(v) => updateContent("contact", "formPhoneLabel", v)} />
                  <Field label="Placeholder 'Телефон'" value={sectionData.formPhonePlaceholder as string} onChange={(v) => updateContent("contact", "formPhonePlaceholder", v)} />
                  <Field label="Мітка 'Email'" value={sectionData.formEmailLabel as string} onChange={(v) => updateContent("contact", "formEmailLabel", v)} />
                  <Field label="Placeholder 'Email'" value={sectionData.formEmailPlaceholder as string} onChange={(v) => updateContent("contact", "formEmailPlaceholder", v)} />
                  <Field label="Мітка 'Повідомлення'" value={sectionData.formMessageLabel as string} onChange={(v) => updateContent("contact", "formMessageLabel", v)} />
                  <Field label="Placeholder 'Повідомлення'" value={sectionData.formMessagePlaceholder as string} onChange={(v) => updateContent("contact", "formMessagePlaceholder", v)} />
                  <Field label="Кнопка (надсилається)" value={sectionData.formSubmitting as string} onChange={(v) => updateContent("contact", "formSubmitting", v)} />
                  <Field label="Кнопка (надіслати)" value={sectionData.formSubmit as string} onChange={(v) => updateContent("contact", "formSubmit", v)} />
                  <TextArea label="Повідомлення помилки" value={sectionData.formError as string} onChange={(v) => updateContent("contact", "formError", v)} />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-[16px] font-medium text-primary mb-4">Успішне надсилання</h3>
                <div className="space-y-4 ml-4">
                  <Field label="Заголовок" value={sectionData.successHeading as string} onChange={(v) => updateContent("contact", "successHeading", v)} />
                  <TextArea label="Опис" value={sectionData.successDescription as string} onChange={(v) => updateContent("contact", "successDescription", v)} />
                  <Field label="Мітка номера" value={sectionData.successOrderLabel as string} onChange={(v) => updateContent("contact", "successOrderLabel", v)} />
                  <Field label="Посилання відстеження" value={sectionData.successTrackLink as string} onChange={(v) => updateContent("contact", "successTrackLink", v)} />
                </div>
              </div>
            </div>
          )}

          {activeSection === "navbar" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-headline)] text-[22px] md:text-[28px] font-medium text-primary mb-6">Навігація</h2>
              <Field label="Назва бренду" value={sectionData.brand as string} onChange={(v) => updateContent("navbar", "brand", v)} />
              <Field label="'На сайт'" value={sectionData.backToSite as string} onChange={(v) => updateContent("navbar", "backToSite", v)} />
              <Field label="Кнопка CTA" value={sectionData.cta as string} onChange={(v) => updateContent("navbar", "cta", v)} />
              <Field label="'Увійти'" value={sectionData.signIn as string} onChange={(v) => updateContent("navbar", "signIn", v)} />
              <Field label="'Вийти'" value={sectionData.signOut as string} onChange={(v) => updateContent("navbar", "signOut", v)} />
              <Field label="'Увійти через Google'" value={sectionData.signInGoogle as string} onChange={(v) => updateContent("navbar", "signInGoogle", v)} />
              <Field label="'Адмін'" value={sectionData.admin as string} onChange={(v) => updateContent("navbar", "admin", v)} />
              <Field label="'Адмін панель'" value={sectionData.adminPanel as string} onChange={(v) => updateContent("navbar", "adminPanel", v)} />
              <Field label="'Відстеження'" value={sectionData.tracking as string} onChange={(v) => updateContent("navbar", "tracking", v)} />

              <div className="mt-8">
                <h3 className="text-[16px] font-medium text-primary mb-4">Посилання меню</h3>
                {(sectionData.links as { href: string; label: string }[] || []).map((link, i) => (
                  <div key={i} className="ml-4 mb-3 grid grid-cols-2 gap-3">
                    <Field label="Підпис" value={link.label} onChange={(v) => updateArrayItem("navbar", "links", i, "label", v)} />
                    <Field label="Посилання" value={link.href} onChange={(v) => updateArrayItem("navbar", "links", i, "href", v)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "footer" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-headline)] text-[22px] md:text-[28px] font-medium text-primary mb-6">Підвал</h2>
              <Field label="Назва бренду" value={sectionData.brand as string} onChange={(v) => updateContent("footer", "brand", v)} />
              <TextArea label="Опис" value={sectionData.description as string} onChange={(v) => updateContent("footer", "description", v)} />
              <Field label="Заголовок 'Категорії'" value={sectionData.categoriesHeading as string} onChange={(v) => updateContent("footer", "categoriesHeading", v)} />
              <Field label="Заголовок 'Навігація'" value={sectionData.navigationHeading as string} onChange={(v) => updateContent("footer", "navigationHeading", v)} />
              <Field label="'Відстежити замовлення'" value={sectionData.tracking as string} onChange={(v) => updateContent("footer", "tracking", v)} />
              <Field label="Авторське право" value={sectionData.copyright as string} onChange={(v) => updateContent("footer", "copyright", v)} />
              <Field label="Кредит" value={sectionData.credit as string} onChange={(v) => updateContent("footer", "credit", v)} />
            </div>
          )}

          {activeSection === "track" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-headline)] text-[22px] md:text-[28px] font-medium text-primary mb-6">Відстеження</h2>
              <Field label="Підзаголовок" value={sectionData.subtitle as string} onChange={(v) => updateContent("track", "subtitle", v)} />
              <Field label="Заголовок" value={sectionData.heading as string} onChange={(v) => updateContent("track", "heading", v)} />
              <TextArea label="Опис" value={sectionData.description as string} onChange={(v) => updateContent("track", "description", v)} />
              <Field label="Placeholder" value={sectionData.placeholder as string} onChange={(v) => updateContent("track", "placeholder", v)} />
              <Field label="Кнопка" value={sectionData.button as string} onChange={(v) => updateContent("track", "button", v)} />
              <Field label="Пошук..." value={sectionData.searching as string} onChange={(v) => updateContent("track", "searching", v)} />
              <Field label="Не знайдено" value={sectionData.notFound as string} onChange={(v) => updateContent("track", "notFound", v)} />

              <div className="mt-8">
                <h3 className="text-[16px] font-medium text-primary mb-4">Статуси</h3>
                <div className="ml-4 space-y-3">
                  <Field label="Нове" value={(sectionData.status as Record<string, string>)?.new || ""} onChange={(v) => updateContent("track", "status.new", v)} />
                  <Field label="В роботі" value={(sectionData.status as Record<string, string>)?.in_progress || ""} onChange={(v) => updateContent("track", "status.in_progress", v)} />
                  <Field label="Виконано" value={(sectionData.status as Record<string, string>)?.completed || ""} onChange={(v) => updateContent("track", "status.completed", v)} />
                  <Field label="Скасовано" value={(sectionData.status as Record<string, string>)?.cancelled || ""} onChange={(v) => updateContent("track", "status.cancelled", v)} />
                </div>
              </div>
            </div>
          )}

          {activeSection === "seo" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-headline)] text-[22px] md:text-[28px] font-medium text-primary mb-6">SEO</h2>
              <Field label="Заголовок сторінки" value={sectionData.title as string} onChange={(v) => updateContent("seo", "title", v)} />
              <TextArea label="Мета-опис" value={sectionData.description as string} onChange={(v) => updateContent("seo", "description", v)} />
              <TextArea label="Ключові слова" value={sectionData.keywords as string} onChange={(v) => updateContent("seo", "keywords", v)} />
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-outline-variant/50 flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className={`px-8 py-3 rounded-lg text-[15px] font-medium transition-all cursor-pointer ${
                hasChanges
                  ? "bg-secondary text-white shadow-md hover:bg-secondary/90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {saving ? "Збереження..." : "Зберегти"}
            </button>
            {hasChanges && (
              <span className="text-[13px] text-secondary font-medium">Є незбережені зміни</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[12px] font-medium uppercase tracking-wider text-on-surface-variant mb-1.5">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value || ""}
        onBlur={(e) => {
          if (e.target.value !== value) onChange(e.target.value);
        }}
        className="w-full px-4 py-2.5 bg-white/80 border border-outline-variant/50 rounded-lg text-[14px] text-primary focus:outline-none focus:border-secondary transition-colors"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[12px] font-medium uppercase tracking-wider text-on-surface-variant mb-1.5">
        {label}
      </label>
      <textarea
        defaultValue={value || ""}
        onBlur={(e) => {
          if (e.target.value !== value) onChange(e.target.value);
        }}
        rows={3}
        className="w-full px-4 py-2.5 bg-white/80 border border-outline-variant/50 rounded-lg text-[14px] text-primary focus:outline-none focus:border-secondary transition-colors resize-y"
      />
    </div>
  );
}
