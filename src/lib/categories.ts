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
    desc: "Функціональні та естетичні кухні, створені для вашого простору. Глянцеві та матові фасади, кам'яні стільниці, вбудована техніка.",
    image: "/gallery/kuhni/kuhni-1.jpg",
    photos: [
      { src: "/gallery/kuhni/kuhni-1.jpg", alt: "Сучасна кухня з білими глянцевими фасадами та кам'яною стільницею" },
      { src: "/gallery/kuhni/kuhni-2.jpg", alt: "Кухня з вбудованою духовкою та витяжкою" },
      { src: "/gallery/kuhni/kuhni-3.jpg", alt: "Кухня — загальний вигляд" },
      { src: "/gallery/kuhni/kuhni-4.jpg", alt: "Кухонні шафи та робоча зона" },
      { src: "/gallery/kuhni/kuhni-5.jpg", alt: "Матова кухня сірого кольору з чорною стільницею" },
      { src: "/gallery/kuhni/kuhni-6.jpg", alt: "Кухня L-подібної форми з темним фартухом" },
      { src: "/gallery/kuhni/kuhni-7.jpg", alt: "Кухня з варильною панеллю та мийкою" },
    ],
  },
  {
    slug: "vanni",
    title: "Ванні кімнати",
    desc: "Меблі для ванних кімнат з вологостійких матеріалів. Тумби під раковину, навісні шафи, полички з підсвіткою.",
    image: "/gallery/vanni/vanni-1.jpg",
    photos: [
      { src: "/gallery/vanni/vanni-1.jpg", alt: "Навісна шафа для ванної кімнати" },
      { src: "/gallery/vanni/vanni-2.jpg", alt: "Тумба під раковину з мармуровою стільницею" },
      { src: "/gallery/vanni/vanni-3.jpg", alt: "Висока шафа у ванній кімнаті" },
      { src: "/gallery/vanni/vanni-4.jpg", alt: "Сіра ванна з дзеркалом на підсвітці" },
      { src: "/gallery/vanni/vanni-5.jpg", alt: "Ванна кімната з круглим дзеркалом та LED-підсвіткою" },
      { src: "/gallery/vanni/vanni-6.jpg", alt: "Тумба під раковину з дерев'яними полицями" },
      { src: "/gallery/vanni/vanni-7.jpg", alt: "Дерев'яні полички з підсвіткою над раковиною" },
      { src: "/gallery/vanni/vanni-8.jpg", alt: "Ванна кімната з душовою зоною" },
    ],
  },
  {
    slug: "vitalni",
    title: "Вітальні",
    desc: "Шафи, комоди, полиці та системи зберігання для вітальні. ТВ-тумби, вітрини, настінні полиці.",
    image: "/gallery/vitalni/vitalni-1.jpg",
    photos: [
      { src: "/gallery/vitalni/vitalni-1.jpg", alt: "ТВ-тумба з полицями" },
      { src: "/gallery/vitalni/vitalni-2.jpg", alt: "Вітрина зі скляними полицями та підсвіткою" },
      { src: "/gallery/vitalni/vitalni-3.jpg", alt: "Вбудована шафа з лавкою та дзеркалом" },
      { src: "/gallery/vitalni/vitalni-4.jpg", alt: "Шафа-купе з дзеркальними дверима" },
      { src: "/gallery/vitalni/vitalni-5.jpg", alt: "Білий комод з рифленими фасадами та золотими ніжками" },
      { src: "/gallery/vitalni/vitalni-6.jpg", alt: "Комод — фронтальний вигляд" },
      { src: "/gallery/vitalni/vitalni-7.jpg", alt: "Настінні полиці та комод з робочою зоною" },
      { src: "/gallery/vitalni/vitalni-8.jpg", alt: "Система настінних полиць різних розмірів" },
    ],
  },
  {
    slug: "spalni",
    title: "Спальні",
    desc: "Ліжка, тумби, комоди та гардеробні для комфортного відпочинку. Вбудовані шафи, туалетні столики.",
    image: "/gallery/spalni/spalni-1.jpg",
    photos: [
      { src: "/gallery/spalni/spalni-1.jpg", alt: "Туалетний столик з дзеркалом" },
      { src: "/gallery/spalni/spalni-2.jpg", alt: "Приліжкові тумбочки" },
      { src: "/gallery/spalni/spalni-3.jpg", alt: "Шафа-купе з матовими дверима" },
      { src: "/gallery/spalni/spalni-4.jpg", alt: "Інтер'єр шафи-купе з полицями та штангами" },
      { src: "/gallery/spalni/spalni-5.jpg", alt: "Біла шафа зі скляними чорними секціями" },
      { src: "/gallery/spalni/spalni-6.jpg", alt: "Шафа — загальний вигляд" },
      { src: "/gallery/spalni/spalni-7.jpg", alt: "Шафа з відкритою скляною дверкою та дерев'яними полицями" },
    ],
  },
  {
    slug: "prikhozha",
    title: "Прихожі",
    desc: "Вбудовані шафи, комоди та системи зберігання для прихожої. Лавки, вішаки, дзеркала.",
    image: "/gallery/prikhozha/prikhozha-1.jpg",
    photos: [
      { src: "/gallery/prikhozha/prikhozha-1.jpg", alt: "Вбудована шафа з лавкою та вішаками" },
      { src: "/gallery/prikhozha/prikhozha-2.jpg", alt: "Шафа з розсувними дверима та ліпниною" },
      { src: "/gallery/prikhozha/prikhozha-3.jpg", alt: "Лавка з м'якою подушкою та гачками" },
      { src: "/gallery/prikhozha/prikhozha-4.jpg", alt: "Верхня шафа з відкритою дверкою" },
      { src: "/gallery/prikhozha/prikhozha-5.jpg", alt: "Інтер'єр шафи з полицями та штангами" },
      { src: "/gallery/prikhozha/prikhozha-6.jpg", alt: "Шафа — внутрішній простір з полицями" },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
