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
                  href="mailto:info@mebli-chortkiv.ua"
                  className="text-[16px] leading-[1.6] text-on-surface hover:text-secondary transition-colors duration-300"
                >
                  info@mebli-chortkiv.ua
                </a>
              </div>
              <div>
                <span className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-on-surface-variant block mb-4">
                  Соціальні мережі
                </span>
                <div className="flex gap-3">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center border border-outline-variant hover:border-secondary hover:bg-secondary/10 transition-colors" aria-label="Instagram">
                    <svg className="w-[20px] h-[20px] fill-on-surface" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center border border-outline-variant hover:border-secondary hover:bg-secondary/10 transition-colors" aria-label="Telegram">
                    <svg className="w-[20px] h-[20px] fill-on-surface" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center border border-outline-variant hover:border-secondary hover:bg-secondary/10 transition-colors" aria-label="TikTok">
                    <svg className="w-[18px] h-[18px] fill-on-surface" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.38-6.22V9.4a8.16 8.16 0 0 0 4.84 1.58V7.53a4.85 4.85 0 0 1-1-.84z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-12 border border-outline-variant/50 rounded-lg">
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
                className="w-full bg-secondary text-on-secondary px-10 py-5 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] hover:bg-secondary/85 transition-all duration-300 mt-4 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
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
