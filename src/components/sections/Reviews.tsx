const reviews = [
  {
    name: "Олена та Андрій",
    location: "Тернопіль",
    text: "Замовляли кухню мрії — результат перевершив очікування. Дерево оброблене бездоганно, кожна деталь продумана.",
    project: "Кухня",
  },
  {
    name: "Ірина",
    location: "Чортків",
    text: "Шафа-купе для спальні — це щось неймовірне. Вбудоване підсвічування, ідеальна система зберігання, все виміряно до міліметра.",
    project: "Спальня",
  },
  {
    name: "Роман",
    location: "Івано-Франківськ",
    text: "Замовляв меблі для свого офісу — робочі столи, шафи для документів та конференц-стіл. Все витримано в єдиному мінімалістичному стилі.",
    project: "Офіс",
  },
  {
    name: "Марія",
    location: "Львів",
    text: "Ми довго шукали майстрів для нестандартної вітальні. Mebli Chortciv не просто виготовили меблі — вони допомогли з дизайном.",
    project: "Вітальня",
  },
  {
    name: "Віктор та Наталія",
    location: "Чортків",
    text: "Другий раз замовляємо меблі — спочатку була ванна, тепер дитяча. Якість на найвищому рівні, рекомендуємо всім!",
    project: "Ванна + Дитяча",
  },
  {
    name: "Тарас",
    location: "Київ",
    text: "Замовляв кухонний острів за власним ескізом. Майстри реалізували ідею навіть краще, ніж я уявляв. Дубовий масив — неймовірно.",
    project: "Кухня",
  },
];

export function Reviews() {
  return (
    <>
      <section className="py-28 md:py-44" id="reviews">
        <div className="max-w-[1600px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mb-20">
            <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-5 block">
              Відгуки
            </span>
            <h2 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-primary mb-5">
              Що кажуть наші клієнти
            </h2>
            <p className="text-[16px] leading-[1.7] text-on-surface-variant">
              Наша найкраща реклама — задоволені клієнти, які повертаються знову
              і рекомендують нас своїм друзям.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="p-10 bg-white border border-outline-variant/50 flex flex-col transition-all duration-500 hover:border-secondary/30 hover:shadow-[0_8px_30px_-12px_rgba(47,51,44,0.15)]"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-tertiary text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-[16px] leading-[1.8] text-on-surface-variant mb-10 flex-grow italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="border-t border-outline-variant/50 pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-[family-name:var(--font-headline)] text-[16px] font-medium text-primary">
                        {review.name}
                      </div>
                      <div className="text-[14px] text-on-surface-variant mt-1">
                        {review.location}
                      </div>
                    </div>
                    <span className="text-[13px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] text-tertiary bg-tertiary/10 px-4 py-2">
                      {review.project}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-y border-outline-variant/50">
        <div className="max-w-[1600px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 text-center">
            <div>
              <div className="font-[family-name:var(--font-headline)] text-[44px] md:text-[52px] font-medium text-tertiary leading-none mb-3">
                4.9
              </div>
              <div className="text-[14px] text-on-surface-variant uppercase tracking-[0.15em] font-[family-name:var(--font-body)] font-medium">
                Середня оцінка
              </div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-headline)] text-[44px] md:text-[52px] font-medium text-tertiary leading-none mb-3">
                98%
              </div>
              <div className="text-[14px] text-on-surface-variant uppercase tracking-[0.15em] font-[family-name:var(--font-body)] font-medium">
                Рекомендують нас
              </div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-headline)] text-[44px] md:text-[52px] font-medium text-tertiary leading-none mb-3">
                60%
              </div>
              <div className="text-[14px] text-on-surface-variant uppercase tracking-[0.15em] font-[family-name:var(--font-body)] font-medium">
                Повторних замовлень
              </div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-headline)] text-[44px] md:text-[52px] font-medium text-tertiary leading-none mb-3">
                500+
              </div>
              <div className="text-[14px] text-on-surface-variant uppercase tracking-[0.15em] font-[family-name:var(--font-body)] font-medium">
                Завершених проектів
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
