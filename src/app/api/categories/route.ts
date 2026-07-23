import { NextResponse } from "next/server";
import { kvGetCategories } from "@/lib/kv";
import { readFile } from "fs/promises";
import path from "path";

const CATEGORIES_FILE = path.join(process.cwd(), "data", "categories.json");

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const kv = await kvGetCategories();
    if (kv) {
      return NextResponse.json(kv, { headers: { "Cache-Control": "no-store" } });
    }
    const data = await readFile(CATEGORIES_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Categories not available" }, { status: 500 });
  }
}
