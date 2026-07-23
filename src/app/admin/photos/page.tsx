"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Photo {
  src: string;
  alt: string;
}

interface Category {
  slug: string;
  title: string;
  desc: string;
  image: string;
  photos: Photo[];
}

export default function AdminPhotosPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("kuhni");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [editingAlt, setEditingAlt] = useState<string | null>(null);
  const [altValue, setAltValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/photos");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setCategories(data.categories);
    } catch {
      setMessage("Помилка завантаження");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const activeCat = categories.find((c) => c.slug === activeCategory);

  const apiCall = async (action: string, body: Record<string, unknown>) => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...body }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Збережено!");
        await fetchCategories();
      } else {
        setMessage(data.error || "Помилка");
      }
    } catch {
      setMessage("Помилка з'єднання");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = async (toIndex: number) => {
    if (dragIndex === null || dragIndex === toIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }

    const photos = activeCat?.photos || [];
    const reordered = [...photos];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(toIndex, 0, moved);

    setCategories((prev) =>
      prev.map((c) =>
        c.slug === activeCategory ? { ...c, photos: reordered } : c
      )
    );

    await apiCall("reorder", {
      category: activeCategory,
      index: dragIndex,
      toIndex,
    });

    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleMove = async (photo: Photo, targetCategory: string) => {
    if (targetCategory === activeCategory) return;
    await apiCall("move", {
      category: activeCategory,
      photo,
      targetCategory,
    });
  };

  const handleDelete = async (photo: Photo) => {
    if (!confirm("Видалити це фото?")) return;
    await apiCall("delete", { category: activeCategory, photo });
  };

  const handleDeleteSelected = async () => {
    if (!confirm(`Видалити ${selectedPhotos.size} фото?`)) return;
    setSaving(true);
    setMessage("");
    try {
      for (const src of selectedPhotos) {
        const photo = activeCat?.photos.find((p) => p.src === src);
        if (photo) {
          await fetch("/api/admin/photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "delete",
              category: activeCategory,
              photo,
            }),
          });
        }
      }
      setSelectedPhotos(new Set());
      setMessage("Видалено!");
      await fetchCategories();
    } catch {
      setMessage("Помилка");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setSaving(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("category", activeCategory);
      for (const file of Array.from(files)) {
        formData.append("files", file);
      }

      const res = await fetch("/api/admin/photos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setMessage(`Завантажено ${data.photos.length} фото`);
        await fetchCategories();
      } else {
        setMessage(data.error || "Помилка завантаження");
      }
    } catch {
      setMessage("Помилка завантаження");
    } finally {
      setSaving(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleAltSave = async (photo: Photo) => {
    await apiCall("updateAlt", {
      category: activeCategory,
      photo: { src: photo.src, alt: altValue },
    });
    setEditingAlt(null);
  };

  const toggleSelect = (src: string) => {
    setSelectedPhotos((prev) => {
      const next = new Set(prev);
      if (next.has(src)) next.delete(src);
      else next.add(src);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (!activeCat) return;
    if (selectedPhotos.size === activeCat.photos.length) {
      setSelectedPhotos(new Set());
    } else {
      setSelectedPhotos(new Set(activeCat.photos.map((p) => p.src)));
    }
  };

  if (loading) {
    return (
      <section className="py-28 min-h-screen">
        <div className="max-w-[1600px] mx-auto px-5 md:px-8">
          <div className="flex items-center gap-3 text-on-surface-variant">
            <span className="material-symbols-outlined animate-spin text-[24px]">progress_activity</span>
            Завантаження...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-28 md:py-44 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="flex flex-col gap-6 mb-10 md:mb-14">
          <div>
            <span className="text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-secondary mb-4 md:mb-5 block">
              Адмін панель
            </span>
            <h1 className="font-[family-name:var(--font-headline)] text-[30px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-primary mb-4">
              Керування фото
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-[14px] font-medium text-on-surface-variant hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Назад
            </Link>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-secondary/10 text-secondary text-[14px] font-medium">
            {message}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setActiveCategory(cat.slug);
                setSelectedPhotos(new Set());
                setEditingAlt(null);
              }}
              className={`px-5 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
                activeCategory === cat.slug
                  ? "bg-secondary text-white shadow-md"
                  : "bg-white/60 text-on-surface-variant hover:bg-white/80 border border-outline-variant/50"
              }`}
            >
              {cat.title}
              <span className="ml-2 text-[12px] opacity-70">({cat.photos.length})</span>
            </button>
          ))}
        </div>

        {activeCat && (
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-lg text-[14px] font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">upload</span>
              Завантажити фото
            </button>

            {selectedPhotos.size > 0 && (
              <>
                <button
                  onClick={handleDeleteSelected}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg text-[14px] font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  Видалити ({selectedPhotos.size})
                </button>
                <button
                  onClick={() => setSelectedPhotos(new Set())}
                  className="px-4 py-2.5 text-[14px] text-on-surface-variant hover:text-primary transition-colors"
                >
                  Зняти виділення
                </button>
              </>
            )}

            <label className="flex items-center gap-2 ml-auto text-[14px] text-on-surface-variant cursor-pointer">
              <input
                type="checkbox"
                checked={activeCat.photos.length > 0 && selectedPhotos.size === activeCat.photos.length}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded accent-secondary"
              />
              Вибрати всі
            </label>
          </div>
        )}

        {activeCat && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {activeCat.photos.map((photo, index) => (
              <div
                key={photo.src + index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => {
                  setDragIndex(null);
                  setDragOverIndex(null);
                }}
                className={`group relative bg-white/60 backdrop-blur-sm border rounded-lg overflow-hidden transition-all cursor-grab active:cursor-grabbing ${
                  dragOverIndex === index
                    ? "border-secondary ring-2 ring-secondary/30"
                    : selectedPhotos.has(photo.src)
                    ? "border-secondary/50 ring-1 ring-secondary/20"
                    : "border-outline-variant/50 hover:border-secondary/30"
                } ${dragIndex === index ? "opacity-50 scale-95" : ""}`}
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedPhotos.has(photo.src)}
                      onChange={() => toggleSelect(photo.src)}
                      className="w-4 h-4 rounded accent-secondary cursor-pointer"
                    />
                  </div>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          handleMove(photo, e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="bg-black/60 text-white text-[11px] px-1.5 py-1 rounded cursor-pointer backdrop-blur-sm"
                    >
                      <option value="">→</option>
                      {categories
                        .filter((c) => c.slug !== activeCategory)
                        .map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.title}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={() => handleDelete(photo)}
                      className="bg-red-600/80 text-white p-1 rounded hover:bg-red-600 transition-colors backdrop-blur-sm"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-[11px] font-medium">
                      {index + 1}/{activeCat.photos.length}
                    </span>
                  </div>
                </div>

                <div className="p-2">
                  {editingAlt === photo.src ? (
                    <div className="flex gap-1">
                      <input
                        type="text"
                        value={altValue}
                        onChange={(e) => setAltValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAltSave(photo);
                          if (e.key === "Escape") setEditingAlt(null);
                        }}
                        className="flex-1 text-[11px] px-2 py-1 border border-outline-variant/50 rounded bg-white/80 text-primary focus:outline-none focus:border-secondary"
                        autoFocus
                      />
                      <button
                        onClick={() => handleAltSave(photo)}
                        className="text-secondary p-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingAlt(photo.src);
                        setAltValue(photo.alt);
                      }}
                      className="w-full text-left text-[11px] text-on-surface-variant truncate hover:text-secondary transition-colors"
                      title={photo.alt}
                    >
                      {photo.alt || "Додати опис..."}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeCat && activeCat.photos.length === 0 && (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] mb-4 block">photo_library</span>
            <p className="text-[16px]">Немає фото у цій категорії</p>
            <p className="text-[14px] mt-2">Завантажте фото за допомогою кнопки вище</p>
          </div>
        )}
      </div>
    </section>
  );
}
