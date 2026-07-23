import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "data", "content.json");

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await readFile(CONTENT_FILE, "utf-8");
    const content = JSON.parse(data);
    return NextResponse.json(content, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Content not available" }, { status: 500 });
  }
}
