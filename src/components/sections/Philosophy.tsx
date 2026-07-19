const values = [
  {
    icon: "architecture",
    title: "Архітектурна ясність",
    desc: "Ми уникаємо зайвого декору. Кожна лінія має своє призначення, створюючи форми, які не підвладні часу та трендам.",
  },
  {
    icon: "forest",
    title: "Природні текстури",
    desc: "Ми віддаємо перевагу натуральному дереву, підкреслюючи його унікальний малюнок та текстуру в кожному виробі.",
  },
  {
    icon: "handyman",
    title: "Безкомпромісна якість",
    desc: "Ручна робота на ключових етапах виробництва гарантує надійність та довговічність на десятиліття.",
  },
];

export function Philosophy() {
  return (
    <section className="py-28 md:py-44">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="text-center mb-20">
          <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-5 block">
            Філософія
          </span>
          <h2 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-primary">
            Менше означає більше
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="group p-12 bg-white border border-outline-variant/50 transition-all duration-500 hover:border-secondary/30 hover:shadow-[0_8px_30px_-12px_rgba(47,51,44,0.15)]"
            >
              <span
                className="material-symbols-outlined text-[36px] text-secondary mb-8 block"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                {value.icon}
              </span>
              <h3 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">
                {value.title}
              </h3>
              <p className="text-[16px] leading-[1.8] text-on-surface-variant">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
