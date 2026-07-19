const categories = [
  {
    title: "Кухні",
    desc: "Функціональні та естетичні кухні, створені для вашого простору.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "Ванні кімнати",
    desc: "Меблі для ванних кімнат з вологостійких матеріалів.",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "Вітальні",
    desc: "Шафи, полиці та системи зберігання для вітальні.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "Спальні",
    desc: "Ліжка, комоди та гардеробні для комфотного відпочинку.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "Офіси",
    desc: "Меблі для офісних просторів, що поєднують функціональність та стиль.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
  },
];

export function Categories() {
  return (
    <section
      className="py-28 md:py-44 bg-green-section text-green-section-on"
      id="categories"
    >
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="max-w-xl mb-20">
          <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-tertiary mb-5 block">
            Категорії
          </span>
          <h2 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-white mb-5">
            Наші роботи
          </h2>
          <p className="text-[16px] leading-[1.7] text-green-section-muted">
            Оберіть категорію, щоб переглянути наші роботи та отримати
            натхнення для вашого простору.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 rounded-lg">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <h3 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-white mb-2 group-hover:text-tertiary transition-colors duration-300">
                {cat.title}
              </h3>
              <p className="text-[16px] leading-[1.7] text-green-section-muted">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
