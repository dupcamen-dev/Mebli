"use client";

import { useContent } from "@/contexts/ContentContext";

export function Reviews() {
  const { content } = useContent();
  const c = content.reviews;
  return (
    <>
      <section className="py-28 md:py-44" id="reviews">
        <div className="max-w-[1600px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mb-20">
            <span className="text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-5 block">
              {c.subtitle}
            </span>
            <h2 className="font-[family-name:var(--font-headline)] text-[36px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-primary mb-5">
              {c.heading}
            </h2>
            <p className="text-[16px] leading-[1.7] text-on-surface-variant">
              {c.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.items.map((review) => (
              <div
                key={review.name}
                className="p-10 bg-white/60 backdrop-blur-lg border border-outline-variant/50 rounded-lg flex flex-col transition-all duration-500 hover:border-secondary/30 hover:bg-white/80 hover:shadow-[0_8px_30px_-12px_rgba(47,51,44,0.15)]"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-tertiary text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-[16px] leading-[1.8] text-on-surface-variant mb-10 flex-grow italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="border-t border-outline-variant/50 pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-[family-name:var(--font-headline)] text-[16px] font-medium text-primary">
                        {review.name}
                      </div>
                      <div className="text-[14px] text-on-surface-variant mt-1">
                        {review.location}
                      </div>
                    </div>
                    <span className="text-[13px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-body)] text-tertiary bg-tertiary/10 px-4 py-2">
                      {review.project}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-y border-outline-variant/50">
        <div className="max-w-[1600px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 text-center">
            {c.stats.map((stat, i) => (
              <div key={i}>
                <div className="font-[family-name:var(--font-headline)] text-[44px] md:text-[52px] font-medium text-tertiary leading-none mb-3">
                  {stat.value}
                </div>
                <div className="text-[14px] text-on-surface-variant uppercase tracking-[0.15em] font-[family-name:var(--font-body)] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
