"use client";

import { useState, useEffect } from "react";
import { categories as defaultCategories, type Category } from "@/lib/categories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data as Category[]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}
