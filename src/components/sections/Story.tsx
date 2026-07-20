export function Story() {
  return (
    <section className="bg-green-section text-green-section-on">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-28 md:py-44">
        <div className="text-center mb-20">
          <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-tertiary mb-5 block">
            Наша історія
          </span>
          <h2 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[52px] font-medium leading-[1.1] tracking-[-0.01em] text-white max-w-3xl mx-auto">
            Від ідеї до досконалості
          </h2>
        </div>

        <div className="relative mb-20 overflow-hidden rounded-lg">
          <img
            src="/gallery/kuhni/kuhni-5.jpg"
            alt="Майстерня Mebli Chortkiv"
            className="w-full h-[320px] md:h-[520px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-section via-green-section/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14">
            <p className="text-[17px] md:text-[19px] leading-[1.8] text-white/90 max-w-2xl">
              Заснована з пристрасті до природних матеріалів та архітектурної
              чистоти, Mebli Chortkiv починалася як невелика майстерня. Ми
              вірили, що справжня розкіш полягає у простоті та бездоганному
              виконанні.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start mb-20">
          <div className="md:col-span-5">
            <img
              src="/gallery/vitalni/vitalni-5.jpg"
              alt="Ручна робота над меблями"
              className="w-full h-72 md:h-96 object-cover rounded-lg mb-8"
            />
            <div className="flex gap-10">
              <div>
                <div className="font-[family-name:var(--font-headline)] text-[40px] md:text-[46px] font-medium text-white leading-none mb-2">
                  12+
                </div>
                <div className="text-[14px] text-white/50 uppercase tracking-[0.15em] font-[family-name:var(--font-body)] font-medium">
                  Років досвіду
                </div>
              </div>
              <div>
                <div className="font-[family-name:var(--font-headline)] text-[40px] md:text-[46px] font-medium text-white leading-none mb-2">
                  500+
                </div>
                <div className="text-[14px] text-white/50 uppercase tracking-[0.15em] font-[family-name:var(--font-body)] font-medium">
                  Проектів
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <h3 className="font-[family-name:var(--font-headline)] text-[24px] md:text-[30px] font-medium text-white leading-[1.3] mb-8">
              Сьогодні ми співпрацюємо з провідними дизайнерами інтер&apos;єрів
            </h3>
            <p className="text-[16px] leading-[1.9] text-white/70 mb-8">
              Створюючи індивідуальні рішення для житлових та комерційних
              просторів, зберігаючи вірність нашим принципам мінімалізму та
              довговічності. Кожен проект — це поєднання традиційного ремесла
              та сучасного бачення.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-[2px] bg-tertiary" />
              <span className="text-[14px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-tertiary">
                Чортків, Тернопільщина
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
