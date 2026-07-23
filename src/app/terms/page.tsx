import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Умови використання",
  description: "Умови використання сайту Mebli Chortkiv — правила замовлення меблів та умови співпраці.",
};

export default function TermsPage() {
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
          Умови використання
        </h1>
        <p className="text-[14px] text-on-surface-variant mb-10">
          Останнє оновлення: 23 липня 2026 р.
        </p>

        <div className="space-y-10 text-[15px] leading-[1.8] text-on-surface">
          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">1. Загальні умови</h2>
            <p className="text-on-surface-variant">
              Використовуючи веб-сайт <strong>mebli-chortkiv.vercel.app</strong> (далі — «Сайт»), ви погоджуєтеся з цими Умовами використання. Якщо ви не згодні з будь-яким положенням, будь ласка, не використовуйте Сайт.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">2. Замовлення меблів</h2>
            <p className="text-on-surface-variant mb-3">Процес замовлення:</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>Залиште заявку через форму зворотного зв&apos;язку на Сайті</li>
              <li>Наш менеджер зв&apos;яжеться з вами для уточнення деталей</li>
              <li>Після узгодження проекту та кошторису укладається договір</li>
              <li>Оплата здійснюється згідно умов договору</li>
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">3. Ціни та оплата</h2>
            <p className="text-on-surface-variant">
              Ціни на Сайті є орієнтовними і можуть змінюватися залежно від обсягу робіт, обраних матеріалів та складності проекту. Остаточна вартість визначається після замірів та затвердження проекту. Оплата здійснюється згідно умов, визначених у договорі.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">4. Гарантія та повернення</h2>
            <p className="text-on-surface-variant mb-3">
              Ми надаємо гарантію на виготовлені меблі згідно умов договору. Оскільки меблі виготовляються на замовлення за індивідуальними параметрами, повернення товару стандартного типу «30 днів» не застосовується.
            </p>
            <p className="text-on-surface-variant mb-3">Гарантійні зобов&apos;язання поширюються на:</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>Дефекти матеріалів</li>
              <li>Дефекти виготовлення та монтажу</li>
              <li>Поломки фурнітури (за наявності)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">5. Терміни виготовлення</h2>
            <p className="text-on-surface-variant">
              Терміни виготовлення меблів визначаються індивідуально для кожного замовлення та фіксуються в договорі. Ми докладаємо максимум зусиль для дотримання узгоджених термінів, але можливі зміни у випадку затримки поставки матеріалів, про що замовник повідомляється завчасно.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">6. Авторське право</h2>
            <p className="text-on-surface-variant">
              Усі матеріали, розміщені на Сайті (тексти, зображення, логотипи, дизайн), є власністю Mebli Chortkiv та захищені законодавством України про авторське право. Копіювання та використання матеріалів без письмової згоди заборонено.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">7. Відповідальність</h2>
            <p className="text-on-surface-variant">
              Mebli Chortkiv не несе відповідальності за непрямі збитки, упущену вигоду або наслідки, що виникли в результаті використання Сайту або неналежного виконання замовлення з вини замовника.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">8. Зміна умов</h2>
            <p className="text-on-surface-variant">
              Ми залишаємо за собою право змінювати ці Умови в будь-який час. Зміни набувають чинності з моменту публікації на Сайті. Рекомендуємо періодично переглядати цю сторінку.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">9. Контакти</h2>
            <p className="text-on-surface-variant">
              З питань, пов&apos;язаних з умовами використання:
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
