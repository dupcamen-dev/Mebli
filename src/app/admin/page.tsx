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
    <section className="py-28 md:py-44">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="max-w-xl mb-20">
          <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-5 block">
            Адмін панель
          </span>
          <h1 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-primary mb-7">
            Керування сайтом
          </h1>
          <p className="text-[16px] leading-[1.7] text-on-surface-variant">
            Привіт, {session.user.name || session.user.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/admin/orders"
            className="group p-10 bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg transition-all duration-500 hover:border-secondary/30 hover:bg-white/80 hover:shadow-[0_8px_30px_-12px_rgba(47,51,44,0.15)]"
          >
            <span
              className="material-symbols-outlined text-[36px] text-secondary mb-6 block"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              list_alt
            </span>
            <h3 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-3 group-hover:text-secondary transition-colors">
              Замовлення
            </h3>
            <p className="text-[16px] leading-[1.7] text-on-surface-variant">
              Перегляд та управління замовленнями з сайту
            </p>
          </Link>

          <Link
            href="/admin/settings"
            className="group p-10 bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg transition-all duration-500 hover:border-secondary/30 hover:bg-white/80 hover:shadow-[0_8px_30px_-12px_rgba(47,51,44,0.15)]"
          >
            <span
              className="material-symbols-outlined text-[36px] text-secondary mb-6 block"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              settings
            </span>
            <h3 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-3 group-hover:text-secondary transition-colors">
              Налаштування
            </h3>
            <p className="text-[16px] leading-[1.7] text-on-surface-variant">
              Telegram бот, API ключі та інші налаштування
            </p>
          </Link>

          <Link
            href="/track"
            className="group p-10 bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg transition-all duration-500 hover:border-secondary/30 hover:bg-white/80 hover:shadow-[0_8px_30px_-12px_rgba(47,51,44,0.15)]"
          >
            <span
              className="material-symbols-outlined text-[36px] text-secondary mb-6 block"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              package_2
            </span>
            <h3 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-3 group-hover:text-secondary transition-colors">
              Відстеження
            </h3>
            <p className="text-[16px] leading-[1.7] text-on-surface-variant">
              Перегляд статусу замовлень для клієнтів
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
