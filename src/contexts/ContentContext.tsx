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

const ContentContext = createContext<ContentContextType | null>(null);

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

function deepClone(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj as Record<string, unknown>)) {
    result[key] = deepClone((obj as Record<string, unknown>)[key]);
  }
  return result;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [pendingChanges, setPendingChanges] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data === "object") {
          setContent(data as ContentData);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateContent = useCallback((section: string, key: string, value: string) => {
    setPendingChanges((prev) => {
      const next = { ...prev };
      if (!next[section] || typeof next[section] !== "object") {
        next[section] = {};
      }
      setNestedValue(next[section] as Record<string, unknown>, key, value);
      return next;
    });
    setHasChanges(true);

    setContent((prev) => {
      const next = { ...prev, [section]: { ...(prev[section] as Record<string, unknown>) } };
      setNestedValue(next[section] as Record<string, unknown>, key, value);
      return next;
    });
  }, []);

  const updateArrayItem = useCallback((section: string, arrayKey: string, index: number, field: string, value: string) => {
    setPendingChanges((prev) => {
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

    setContent((prev) => {
      const next = { ...prev, [section]: { ...(prev[section] as Record<string, unknown>) } };
      const sec = next[section] as Record<string, unknown>;
      if (!sec[arrayKey] || !Array.isArray(sec[arrayKey])) return next;
      const arr = [...(sec[arrayKey] as Record<string, unknown>[])];
      arr[index] = { ...arr[index], [field]: value };
      sec[arrayKey] = arr;
      return next;
    });
  }, []);

  const saveContent = useCallback(async () => {
    try {
      const merged = deepClone(content) as Record<string, unknown>;
      for (const section of Object.keys(pendingChanges)) {
        const sectionChanges = pendingChanges[section] as Record<string, unknown>;
        if (!merged[section]) merged[section] = {};
        for (const key of Object.keys(sectionChanges)) {
          (merged[section] as Record<string, unknown>)[key] = sectionChanges[key];
        }
      }

      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: merged }),
      });

      if (res.ok) {
        setPendingChanges({});
        setHasChanges(false);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [content, pendingChanges]);

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
