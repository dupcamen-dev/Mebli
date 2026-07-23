import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import Link from "next/link";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !isAdmin(session.user.email)) {
    redirect("/");
  }

  return (
    <section className="py-28 md:py-44 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="flex flex-col gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-4 md:mb-5 block">
              Адмін панель
            </span>
            <h1 className="font-[family-name:var(--font-headline)] text-[30px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-primary mb-4">
              Керування сайтом
            </h1>
            <p className="text-[14px] md:text-[16px] leading-[1.7] text-on-surface-variant">
              Привіт, {session.user.name || session.user.email}
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-[14px] font-medium text-on-surface-variant hover:text-secondary transition-colors self-start"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Повернутися на сайт
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          <Link
            href="/admin/orders"
            className="group p-7 md:p-10 bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg transition-all duration-500 hover:border-secondary/30 hover:bg-white/80 hover:shadow-[0_8px_30px_-12px_rgba(47,51,44,0.15)]"
          >
            <span
              className="material-symbols-outlined text-[32px] md:text-[36px] text-secondary mb-4 md:mb-6 block"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              list_alt
            </span>
            <h3 className="font-[family-name:var(--font-headline)] text-[18px] md:text-[22px] font-medium text-primary mb-2 md:mb-3 group-hover:text-secondary transition-colors">
              Замовлення
            </h3>
            <p className="text-[14px] md:text-[16px] leading-[1.7] text-on-surface-variant">
              Перегляд та управління замовленнями з сайту
            </p>
          </Link>

          <Link
            href="/admin/settings"
            className="group p-7 md:p-10 bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg transition-all duration-500 hover:border-secondary/30 hover:bg-white/80 hover:shadow-[0_8px_30px_-12px_rgba(47,51,44,0.15)]"
          >
            <span
              className="material-symbols-outlined text-[32px] md:text-[36px] text-secondary mb-4 md:mb-6 block"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              settings
            </span>
            <h3 className="font-[family-name:var(--font-headline)] text-[18px] md:text-[22px] font-medium text-primary mb-2 md:mb-3 group-hover:text-secondary transition-colors">
              Налаштування
            </h3>
            <p className="text-[14px] md:text-[16px] leading-[1.7] text-on-surface-variant">
              Telegram бот, API ключі та інші налаштування
            </p>
          </Link>

          <Link
            href="/admin/photos"
            className="group p-7 md:p-10 bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg transition-all duration-500 hover:border-secondary/30 hover:bg-white/80 hover:shadow-[0_8px_30px_-12px_rgba(47,51,44,0.15)]"
          >
            <span
              className="material-symbols-outlined text-[32px] md:text-[36px] text-secondary mb-4 md:mb-6 block"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              photo_library
            </span>
            <h3 className="font-[family-name:var(--font-headline)] text-[18px] md:text-[22px] font-medium text-primary mb-2 md:mb-3 group-hover:text-secondary transition-colors">
              Фото
            </h3>
            <p className="text-[14px] md:text-[16px] leading-[1.7] text-on-surface-variant">
              Керування галереєю: переставляти, видаляти, додавати фото
            </p>
          </Link>

          <Link
            href="/admin/content"
            className="group p-7 md:p-10 bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg transition-all duration-500 hover:border-secondary/30 hover:bg-white/80 hover:shadow-[0_8px_30px_-12px_rgba(47,51,44,0.15)]"
          >
            <span
              className="material-symbols-outlined text-[32px] md:text-[36px] text-secondary mb-4 md:mb-6 block"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              edit_note
            </span>
            <h3 className="font-[family-name:var(--font-headline)] text-[18px] md:text-[22px] font-medium text-primary mb-2 md:mb-3 group-hover:text-secondary transition-colors">
              Текст
            </h3>
            <p className="text-[14px] md:text-[16px] leading-[1.7] text-on-surface-variant">
              Редагування всього тексту на сайті: заголовки, описи, відгуки, контакти
            </p>
          </Link>

        </div>
      </div>
    </section>
  );
}
