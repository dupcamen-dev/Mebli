"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { content as defaultContent, type ContentData } from "@/lib/content";

interface ContentContextType {
  content: ContentData;
  loading: boolean;
  updateContent: (section: string, key: string, value: string) => void;
  updateArrayItem: (section: string, arrayKey: string, index: number, field: string, value: string) => void;
  saveContent: () => Promise<boolean>;
  hasChanges: boolean;
}

const STORAGE_KEY = "mebli-content-overrides";

function loadOverrides(): Partial<ContentData> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveOverrides(overrides: Partial<ContentData>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // ignore
  }
}

function deepMerge<T extends Record<string, unknown>>(base: T, overrides: Partial<T>): T {
  const result = { ...base };
  for (const key of Object.keys(overrides) as (keyof T)[]) {
    const overrideVal = overrides[key];
    const baseVal = base[key];
    if (
      overrideVal && typeof overrideVal === "object" && !Array.isArray(overrideVal) &&
      baseVal && typeof baseVal === "object" && !Array.isArray(baseVal)
    ) {
      (result as Record<string, unknown>)[key as string] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>
      );
    } else if (overrideVal !== undefined) {
      (result as Record<string, unknown>)[key as string] = overrideVal;
    }
  }
  return result;
}

function setNestedValue(obj: Record<string, unknown>, dotKey: string, value: string) {
  const keys = dotKey.split(".");
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (current[keys[i]] && typeof current[keys[i]] === "object") {
      current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) };
      current = current[keys[i]] as Record<string, unknown>;
    } else {
      return;
    }
  }
  current[keys[keys.length - 1]] = value;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [overrides, setOverrides] = useState<Partial<ContentData>>({});
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const saved = loadOverrides();
    if (saved && Object.keys(saved).length > 0) {
      setContent((prev) => deepMerge(prev as Record<string, unknown>, saved as Record<string, unknown>) as ContentData);
      setOverrides(saved);
    }
    setLoading(false);
  }, []);

  const updateContent = useCallback((section: string, key: string, value: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      if (!next[section] || typeof next[section] !== "object") {
        next[section] = {};
      }
      setNestedValue(next[section] as Record<string, unknown>, key, value);
      return next;
    });
    setHasChanges(true);
  }, []);

  const updateArrayItem = useCallback((section: string, arrayKey: string, index: number, field: string, value: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      if (!next[section] || typeof next[section] !== "object") {
        next[section] = {};
      }
      const sec = next[section] as Record<string, unknown>;
      if (!sec[arrayKey] || !Array.isArray(sec[arrayKey])) return next;
      const arr = [...(sec[arrayKey] as Record<string, unknown>[])];
      arr[index] = { ...arr[index], [field]: value };
      sec[arrayKey] = arr;
      return next;
    });
    setHasChanges(true);
  }, []);

  const saveContent = useCallback(async () => {
    const merged = deepMerge(defaultContent as Record<string, unknown>, overrides as Record<string, unknown>) as ContentData;
    setContent(merged);
    saveOverrides(overrides);

    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: merged }),
      });
    } catch {
      // ignore - localStorage is the real persistence
    }

    setHasChanges(false);
    return true;
  }, [overrides]);

  return (
    <ContentContext.Provider value={{ content, loading, updateContent, updateArrayItem, saveContent, hasChanges }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) return { content: defaultContent, loading: false, updateContent: () => {}, updateArrayItem: () => {}, saveContent: async () => false, hasChanges: false };
  return ctx;
}
