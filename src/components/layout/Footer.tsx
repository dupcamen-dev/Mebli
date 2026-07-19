import Link from "next/link";

const categories = [
  { href: "#categories", label: "Кухні" },
  { href: "#categories", label: "Ванні кімнати" },
  { href: "#categories", label: "Вітальні" },
  { href: "#categories", label: "Спальні" },
  { href: "#categories", label: "Офіси" },
];

export function Footer() {
  return (
    <footer className="w-full mt-auto bg-inverse-surface text-inverse-on-surface">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14">
          <div className="md:col-span-5">
            <div className="font-[family-name:var(--font-headline)] text-[26px] font-medium text-white mb-5">
              Mebli Chortciv
            </div>
            <p className="text-[16px] leading-[1.7] text-inverse-on-surface/60 max-w-sm mb-10">
              Виготовлення меблів за індивідуальним проектом. Створюємо простір,
              який відображає вашу унікальність.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-11 h-11 flex items-center justify-center border border-white/10 hover:border-secondary hover:bg-secondary/10 transition-colors"
                aria-label="Instagram"
              >
                <span className="material-symbols-outlined text-[20px]">language</span>
              </a>
              <a
                href="#"
                className="w-11 h-11 flex items-center justify-center border border-white/10 hover:border-secondary hover:bg-secondary/10 transition-colors"
                aria-label="Facebook"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-white/40 block mb-7">
              Категорії
            </span>
            <ul className="flex flex-col gap-4">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="text-[16px] leading-[1.6] text-inverse-on-surface/60 hover:text-white transition-colors duration-300"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-white/40 block mb-7">
              Навігація
            </span>
            <ul className="flex flex-col gap-4 mb-10">
              <li>
                <a href="#reviews" className="text-[16px] text-inverse-on-surface/60 hover:text-white transition-colors duration-300">
                  Відгуки
                </a>
              </li>
              <li>
                <a href="#process" className="text-[16px] text-inverse-on-surface/60 hover:text-white transition-colors duration-300">
                  Процес
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[16px] text-inverse-on-surface/60 hover:text-white transition-colors duration-300">
                  Контакти
                </a>
              </li>
            </ul>
            <p className="text-[14px] text-inverse-on-surface/30">
              &copy; {new Date().getFullYear()} Mebli Chortciv. Всі права захищені.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
