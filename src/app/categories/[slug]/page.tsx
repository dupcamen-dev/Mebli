import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategoryBySlug } from "@/lib/categories";
import type { Metadata } from "next";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const cat = getCategoryBySlug(slug);
    return {
      title: cat ? `${cat.title} — Mebli Chortkiv` : "Mebli Chortkiv",
      description: cat?.desc,
    };
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);

  if (!cat) notFound();

  return (
    <section className="py-28 md:py-44 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="flex flex-col gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-4 md:mb-5 block">
              Категорії
            </span>
            <h1 className="font-[family-name:var(--font-headline)] text-[30px] md:text-[48px] font-medium leading-[1.15] text-primary mb-4">
              {cat.title}
            </h1>
            <p className="text-[14px] md:text-[16px] leading-[1.7] text-on-surface-variant max-w-xl">
              {cat.desc}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/#categories"
              className="flex items-center gap-2 text-[14px] font-medium text-on-surface-variant hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              До категорій
            </Link>
            <span className="text-outline-variant">|</span>
            <Link
              href="/"
              className="flex items-center gap-2 text-[14px] font-medium text-on-surface-variant hover:text-secondary transition-colors"
            >
              На сайт
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {cat.photos.map((photo, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-lg bg-surface"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </div>
              <div className="p-4 md:p-5">
                <p className="text-[14px] text-on-surface-variant">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg p-8 md:p-12 text-center">
          <h2 className="font-[family-name:var(--font-headline)] text-[22px] md:text-[28px] font-medium text-primary mb-4">
            Подобаються наші роботи?
          </h2>
          <p className="text-[15px] text-on-surface-variant mb-8 max-w-md mx-auto">
            Зв&apos;яжіться з нами для безкоштовної консультації та отримайте індивідуальний проєкт.
          </p>
          <a
            href="/#contact"
            className="inline-flex bg-secondary text-on-secondary px-10 py-4 text-[14px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] hover:bg-secondary/85 transition-all duration-300 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            Замовити проект
          </a>
        </div>
      </div>
    </section>
  );
}
