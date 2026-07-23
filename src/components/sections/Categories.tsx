"use client";

import Link from "next/link";
import { categories } from "@/lib/categories";
import { useContent } from "@/contexts/ContentContext";

export function Categories() {
  const { content } = useContent();
  const c = content.categories;
  return (
    <section
      className="py-28 md:py-44 bg-green-section text-green-section-on"
      id="categories"
    >
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="max-w-xl mb-20">
          <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-tertiary mb-5 block">
            {c.subtitle}
          </span>
          <h2 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-white mb-5">
            {c.heading}
          </h2>
          <p className="text-[16px] leading-[1.7] text-green-section-muted">
            {c.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group cursor-pointer"
            >
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
