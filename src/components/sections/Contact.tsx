export function Contact() {
  return (
    <section
      className="py-28 md:py-44"
      id="contact"
    >
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-5 block">
              Контакти
            </span>
            <h2 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-primary mb-7">
              Зв&apos;яжіться
              <br />
              з нами
            </h2>
            <p className="text-[16px] leading-[1.7] text-on-surface-variant mb-14 max-w-md">
              Розкажіть нам про свій проект, і ми зв&apos;яжемося з вами для
              безкоштовної консультації.
            </p>

            <div className="space-y-10">
              <div>
                <span className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-3">
                  Адреса
                </span>
                <p className="text-[16px] leading-[1.6] text-on-surface">
                  м. Чортків, Тернопільська область
                </p>
              </div>
              <div>
                <span className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-3">
                  Телефон
                </span>
                <a
                  href="tel:+380000000000"
                  className="text-[16px] leading-[1.6] text-on-surface hover:text-secondary transition-colors duration-300"
                >
                  +38 (00) 000-00-00
                </a>
              </div>
              <div>
                <span className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-3">
                  Email
                </span>
                <a
                  href="mailto:info@mebli-chortciv.ua"
                  className="text-[16px] leading-[1.6] text-on-surface hover:text-secondary transition-colors duration-300"
                >
                  info@mebli-chortciv.ua
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-12 border border-outline-variant/50">
            <form className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-3"
                >
                  Ім&apos;я
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border-b border-outline-variant bg-transparent px-0 py-3.5 text-[16px] leading-[1.6] text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary transition-colors duration-300"
                  placeholder="Ваше ім'я"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-3"
                >
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full border-b border-outline-variant bg-transparent px-0 py-3.5 text-[16px] leading-[1.6] text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary transition-colors duration-300"
                  placeholder="+38 (___) ___-__-__"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-3"
                >
                  Повідомлення
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full border-b border-outline-variant bg-transparent px-0 py-3.5 text-[16px] leading-[1.6] text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary transition-colors duration-300 resize-none"
                  placeholder="Розкажіть про ваш проект..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-on-secondary px-10 py-5 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] hover:bg-secondary/85 transition-all duration-300 mt-4"
              >
                Надіслати заявку
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
