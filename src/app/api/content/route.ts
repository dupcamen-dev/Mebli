import { NextResponse } from "next/server";
import { kvGetContent } from "@/lib/kv";
import { readFile } from "fs/promises";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "data", "content.json");

export const dynamic = "force-dynamic";

function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const baseVal = result[key];
    const overVal = override[key];
    if (
      overVal !== null && typeof overVal === "object" && !Array.isArray(overVal) &&
      baseVal !== null && typeof baseVal === "object" && !Array.isArray(baseVal)
    ) {
      result[key] = deepMerge(baseVal as Record<string, unknown>, overVal as Record<string, unknown>);
    } else {
      result[key] = overVal;
    }
  }
  return result;
}

export async function GET() {
  try {
    const data = await readFile(CONTENT_FILE, "utf-8");
    const fileContent = JSON.parse(data) as Record<string, unknown>;

    const kv = await kvGetContent();
    if (kv && typeof kv === "object") {
      const merged = deepMerge(fileContent, kv as Record<string, unknown>);
      return NextResponse.json(merged, { headers: { "Cache-Control": "no-store" } });
    }

    return NextResponse.json(fileContent, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Content not available" }, { status: 500 });
  }
}
