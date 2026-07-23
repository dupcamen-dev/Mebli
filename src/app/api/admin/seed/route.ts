import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";
import { kvGetContent, kvSetContent, kvGetCategories, kvSetCategories } from "@/lib/kv";
import { readFile } from "fs/promises";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "data", "content.json");
const CATEGORIES_FILE = path.join(process.cwd(), "data", "categories.json");

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] && typeof source[key] === "object" && !Array.isArray(source[key]) &&
      result[key] && typeof result[key] === "object" && !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(result[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fileContent = JSON.parse(await readFile(CONTENT_FILE, "utf-8"));
    const fileCategories = JSON.parse(await readFile(CATEGORIES_FILE, "utf-8"));

    const existingContent = await kvGetContent();
    if (existingContent) {
      const merged = deepMerge(existingContent as Record<string, unknown>, fileContent);
      await kvSetContent(merged);
    } else {
      await kvSetContent(fileContent);
    }

    const existingCategories = await kvGetCategories();
    if (existingCategories) {
      await kvSetCategories(fileCategories);
    } else {
      await kvSetCategories(fileCategories);
    }

    return NextResponse.json({ success: true, mode: existingContent ? "merged" : "created" });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
