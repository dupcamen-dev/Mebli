export interface Category {
  slug: string;
  title: string;
  desc: string;
  image: string;
  photos: { src: string; alt: string }[];
}

export const categories: Category[] = [
  {
    slug: "kuhni",
    title: "Кухні",
    desc: "Функціональні та естетичні кухні, створені для вашого простору.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop",
    photos: [
      { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format&fit=crop", alt: "Кухня сучасного стилю" },
      { src: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=80&auto=format&fit=crop", alt: "Біла кухня" },
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop", alt: "Кухня-вітальня" },
      { src: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=80&auto=format&fit=crop", alt: "Кухонні шафи" },
      { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format&fit=crop", alt: "Кухня з островом" },
      { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80&auto=format&fit=crop", alt: "Мінімалістична кухня" },
    ],
  },
  {
    slug: "vanni",
    title: "Ванні кімнати",
    desc: "Меблі для ванних кімнат з вологостійких матеріалів.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop",
    photos: [
      { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80&auto=format&fit=crop", alt: "Ванна кімната" },
      { src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80&auto=format&fit=crop", alt: "Тумба під раковину" },
      { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80&auto=format&fit=crop", alt: "Душова кабіна" },
      { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80&auto=format&fit=crop", alt: "Ванна кімната мінімалізм" },
      { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80&auto=format&fit=crop", alt: "Полиці у ванній" },
      { src: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&q=80&auto=format&fit=crop", alt: "Дзеркало з підсвіткою" },
    ],
  },
  {
    slug: "vitalni",
    title: "Вітальні",
    desc: "Шафи, полиці та системи зберігання для вітальні.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop",
    photos: [
      { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80&auto=format&fit=crop", alt: "Вітальня сучасна" },
      { src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80&auto=format&fit=crop", alt: "Шафа-купе" },
      { src: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&q=80&auto=format&fit=crop", alt: "Стінка для вітальні" },
      { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80&auto=format&fit=crop", alt: "Полиці для книг" },
      { src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80&auto=format&fit=crop", alt: "ТВ-тумба" },
      { src: "https://images.unsplash.com/photo-1600607687644-c7f34b5e9a83?w=1200&q=80&auto=format&fit=crop", alt: "Вітальня мінімалізм" },
    ],
  },
  {
    slug: "spalni",
    title: "Спальні",
    desc: "Ліжка, комоди та гардеробні для комфотного відпочинку.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80&auto=format&fit=crop",
    photos: [
      { src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80&auto=format&fit=crop", alt: "Спальня" },
      { src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format&fit=crop", alt: "Ліжко" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80&auto=format&fit=crop", alt: "Гардеробна" },
      { src: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=1200&q=80&auto=format&fit=crop", alt: "Комод" },
      { src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=80&auto=format&fit=crop", alt: "Тумба біля ліжка" },
      { src: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1200&q=80&auto=format&fit=crop", alt: "Спальня мінімалізм" },
    ],
  },
  {
    slug: "ofisy",
    title: "Офіси",
    desc: "Меблі для офісних просторів, що поєднують функціональність та стиль.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
    photos: [
      { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop", alt: "Офіс" },
      { src: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=80&auto=format&fit=crop", alt: "Робочий стіл" },
      { src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80&auto=format&fit=crop", alt: "Офісне крісло" },
      { src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80&auto=format&fit=crop", alt: "Конференц-зал" },
      { src: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1200&q=80&auto=format&fit=crop", alt: "Офісна тумба" },
      { src: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=80&auto=format&fit=crop", alt: "Коворкінг" },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
