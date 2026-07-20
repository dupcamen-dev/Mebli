"use client";

import { useState, useCallback, useEffect } from "react";

interface Photo {
  src: string;
  alt: string;
}

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = useCallback((i: number) => setLightbox(i), []);
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((p) => (p !== null && p > 0 ? p - 1 : p)), []);
  const next = useCallback(() => setLightbox((p) => (p !== null && p < photos.length - 1 ? p + 1 : p)), [photos.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="group overflow-hidden rounded-lg bg-surface cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading={i < 8 ? "eager" : "lazy"}
              />
            </div>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Закрити"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 md:left-6 text-white/70 hover:text-white transition-colors z-10 p-2"
              aria-label="Попереднє"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox < photos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 md:right-6 text-white/70 hover:text-white transition-colors z-10 p-2"
              aria-label="Наступне"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          <div className="absolute bottom-4 md:bottom-6 text-white/50 text-[14px]">
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
