import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description: "Політика конфіденційності Mebli Chortkiv — як ми збираємо, використовуємо та захищаємо ваші дані.",
};

export default function PrivacyPage() {
  return (
    <section className="py-28 md:py-44 min-h-screen">
      <div className="max-w-[800px] mx-auto px-5 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[14px] font-medium text-on-surface-variant hover:text-secondary transition-colors mb-12"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          На головну
        </Link>

        <span className="text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-4 md:mb-5 block">
          Юридична інформація
        </span>
        <h1 className="font-[family-name:var(--font-headline)] text-[30px] md:text-[48px] font-medium leading-[1.15] text-primary mb-8">
          Політика конфіденційності
        </h1>
        <p className="text-[14px] text-on-surface-variant mb-10">
          Останнє оновлення: 23 липня 2026 р.
        </p>

        <div className="space-y-10 text-[15px] leading-[1.8] text-on-surface">
          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">1. Загальні положення</h2>
            <p className="text-on-surface-variant">
              Mebli Chortkiv (далі — «Ми») дотримується законодавства України щодо захисту персональних даних. Ця Політика конфіденційності пояснює, як ми збираємо, використовуємо та захищаємо інформацію, яку ви надаєте при використанні нашого веб-сайту <strong>mebli-chortkiv.vercel.app</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">2. Яку інформацію ми збираємо</h2>
            <p className="text-on-surface-variant mb-3">Ми можемо збирати такі дані:</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li><strong>Ім&apos;я</strong> — для ідентифікації замовника</li>
              <li><strong>Номер телефону</strong> — для зв&apos;язку з вами</li>
              <li><strong>Email</strong> — для листування (якщо вказаний)</li>
              <li><strong>Повідомлення</strong> — текст вашого запиту</li>
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">3. Як ми використовуємо ваші дані</h2>
            <p className="text-on-surface-variant mb-3">Ваші дані використовуються виключно для:</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>Обробки вашого запиту та надання консультації</li>
              <li>Зв&apos;язку з вами з приводу замовлення</li>
              <li>Виконання договору на виготовлення меблів</li>
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">4. Захист даних</h2>
            <p className="text-on-surface-variant">
              Ми вживаємо відповідні технічні та організаційні заходи для захисту ваших персональних даних від несанкціонованого доступу, втрати чи зловживання. Ваші дані не передаються третім особам без вашої згоди, окрім випадків, передбачених законодавством України.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">5. Зберігання даних</h2>
            <p className="text-on-surface-variant">
              Ваші персональні дані зберігаються протягом терміну, необхідного для виконання мети їх збирання, або відповідно до вимог чинного законодавства України.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">6. Ваші права</h2>
            <p className="text-on-surface-variant mb-3">Ви маєте право:</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>Дізнатися, які дані ми зберігаємо про вас</li>
              <li>Вимагати виправлення неточних даних</li>
              <li>Вимагати видалення ваших персональних даних</li>
              <li>Відкликати свою згоду на обробку даних</li>
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">7. Контакти</h2>
            <p className="text-on-surface-variant">
              З питань захисту персональних даних звертайтеся:
              <br />
              <strong>Email:</strong> info@mebli-chortkiv.ua
              <br />
              <strong>Телефон:</strong> (073) 200 27 50
              <br />
              <strong>Адреса:</strong> м. Чортків, Тернопільська область
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
