import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";
import { kvGetContent, kvSetContent } from "@/lib/kv";
import { readFile } from "fs/promises";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "data", "content.json");

async function getInitialContent() {
  try {
    const data = await readFile(CONTENT_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const kv = await kvGetContent();
    const data = kv || await getInitialContent();
    if (!data) {
      return NextResponse.json({ error: "Content not available" }, { status: 500 });
    }
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { section, key, value, content: fullContent } = body;

    if (fullContent) {
      const ok = await kvSetContent(fullContent);
      if (!ok) {
        return NextResponse.json({ error: "KV not configured" }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }

    if (!section || !key) {
      return NextResponse.json({ error: "Missing section or key" }, { status: 400 });
    }

    const existing = (await kvGetContent()) || await getInitialContent();
    if (!existing) {
      return NextResponse.json({ error: "No content found" }, { status: 500 });
    }

    const content = existing as Record<string, unknown>;

    if (!content[section]) {
      return NextResponse.json({ error: "Section not found" }, { status: 400 });
    }

    const keys = key.split(".");
    let obj: Record<string, unknown> = content[section] as Record<string, unknown>;
    for (let i = 0; i < keys.length - 1; i++) {
      if (obj[keys[i]] && typeof obj[keys[i]] === "object") {
        obj[keys[i]] = { ...(obj[keys[i]] as Record<string, unknown>) };
        obj = obj[keys[i]] as Record<string, unknown>;
      }
    }
    obj[keys[keys.length - 1]] = value;

    const ok = await kvSetContent(content);
    if (!ok) {
      return NextResponse.json({ error: "KV not configured" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Content API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
