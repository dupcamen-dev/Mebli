const steps = [
  { icon: "call", title: "Зв'язок", desc: "Консультація" },
  { icon: "architecture", title: "Заміри", desc: "Виїзд на об'єкт" },
  { icon: "design_services", title: "Проект", desc: "Проект та Дизайн" },
  { icon: "layers", title: "Матеріали", desc: "Вибір та замовлення" },
  { icon: "handyman", title: "Виготовлення", desc: "Виробництво" },
  { icon: "home_work", title: "Монтаж", desc: "Встановлення" },
];

export function Process() {
  return (
    <section
      className="py-28 md:py-44 max-w-[1600px] mx-auto px-5 md:px-8"
      id="process"
    >
      <div className="text-center mb-24">
        <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-5 block">
          Як ми працюємо
        </span>
        <h2 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-primary">
          Наш Процес
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="group flex flex-col items-center text-center p-8 rounded-sm hover:bg-surface-container-low transition-all duration-300"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-surface-container-high mb-6 group-hover:bg-secondary-container group-hover:scale-110 transition-all duration-300">
              <span
                className="material-symbols-outlined text-primary text-[26px] group-hover:text-secondary transition-colors duration-300"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                {step.icon}
              </span>
            </div>
            <span className="text-[14px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-[family-name:var(--font-headline)] text-[18px] font-medium text-primary mb-1">
              {step.title}
            </h3>
            <p className="text-[15px] text-on-surface-variant">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
