"use client";

export function CTA() {
  return (
    <section className="py-28 md:py-44 bg-green-section text-green-section-on text-center">
      <div className="max-w-[800px] mx-auto px-8 md:px-16">
        <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-tertiary mb-7 block">
          Готові почати?
        </span>
        <h2 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-white mb-7">
          Створіть простір своєї мрії
        </h2>
        <p className="text-[16px] leading-[1.7] text-green-section-muted max-w-lg mx-auto mb-14">
          Зв&apos;яжіться з нами для консультації та обговорення вашого
          індивідуального проекту. Безкоштовно.
        </p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center justify-center bg-white text-primary px-12 py-5 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] hover:bg-white/90 transition-all duration-300 cursor-pointer"
        >
          Обговорити проект
        </a>
      </div>
    </section>
  );
}
