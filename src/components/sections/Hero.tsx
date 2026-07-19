"use client";

export function Hero() {
  return (
    <section className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url('/hero.webp')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-8 text-center">
        <div className="animate-fade-up">
          <span className="inline-block text-white/60 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] font-[family-name:var(--font-body)] mb-8">
            Виготовлення меблів на замовлення
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-headline)] text-[30px] md:text-[56px] lg:text-[68px] font-medium leading-[1.05] tracking-[-0.02em] text-white max-w-5xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Меблі, створені
          <br />
          <span className="font-[family-name:var(--font-script)] text-[38px] md:text-[66px] lg:text-[82px] font-normal" style={{ color: "#9c8a41" }}>Вашим</span>{" "}
          <span className="font-[family-name:var(--font-headline)] text-[30px] md:text-[56px] lg:text-[68px] font-medium text-white">характером</span>
        </h1>
        <p className="text-[13px] md:text-[17px] leading-[1.7] text-white/75 max-w-xl mx-auto mb-14 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Преміальне виготовлення за індивідуальним проектом. Поєднуємо
          натуральне дерево з сучасним дизайном для вашого простору.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center bg-white text-primary px-12 py-5 text-[12px] md:text-[13px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] hover:bg-white/90 transition-all duration-300 cursor-pointer rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
          >
            Замовити проект
          </a>
          <a
            href="#process"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("process")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center bg-white/10 text-white border border-white/20 px-12 py-5 text-[12px] md:text-[13px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] hover:bg-white/20 backdrop-blur-md transition-all duration-300 cursor-pointer rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          >
            Наш процес
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#process"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("process")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-white/40 hover:text-white/80 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[36px] animate-bounce">
            keyboard_arrow_down
          </span>
        </a>
      </div>
    </section>
  );
}
