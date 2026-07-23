"use client";

import Link from "next/link";
import { useContent } from "@/contexts/ContentContext";

export default function PrivacyPage() {
  const { content } = useContent();
  const c = content.privacy;

  return (
    <section className="py-28 md:py-44 min-h-screen">
      <div className="max-w-[800px] mx-auto px-5 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[14px] font-medium text-on-surface-variant hover:text-secondary transition-colors mb-12"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          На головну
        </Link>

        <span className="text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-4 md:mb-5 block">
          Юридична інформація
        </span>
        <h1 className="font-[family-name:var(--font-headline)] text-[30px] md:text-[48px] font-medium leading-[1.15] text-primary mb-8">
          {c.label}
        </h1>
        <p className="text-[14px] text-on-surface-variant mb-10">
          {c.updatedDate}
        </p>

        <div className="space-y-10 text-[15px] leading-[1.8] text-on-surface">
          {c.sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-[family-name:var(--font-headline)] text-[22px] font-medium text-primary mb-4">{section.heading}</h2>
              {section.content.split("\n").map((line, j) => (
                <p key={j} className={line.startsWith("- ") ? "text-on-surface-variant pl-6 relative before:content-['•'] before:absolute before:left-0" : "text-on-surface-variant"}>
                  {line.startsWith("- ") ? line.slice(2) : line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
