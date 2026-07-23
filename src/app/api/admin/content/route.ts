import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "data", "content.json");

async function readContent() {
  const data = await readFile(CONTENT_FILE, "utf-8");
  return JSON.parse(data);
}

async function writeContent(content: unknown) {
  await writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const content = await readContent();
    return NextResponse.json({ content });
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
      await writeContent(fullContent);
      return NextResponse.json({ success: true });
    }

    if (!section || !key) {
      return NextResponse.json({ error: "Missing section or key" }, { status: 400 });
    }

    const content = await readContent();
    if (!content[section]) {
      return NextResponse.json({ error: "Section not found" }, { status: 400 });
    }

    const keys = key.split(".");
    let obj: Record<string, unknown> = content[section];
    for (let i = 0; i < keys.length - 1; i++) {
      if (Array.isArray(obj[keys[i]])) {
        obj = obj[keys[i]] as Record<string, unknown>;
      } else {
        obj = obj[keys[i]] as Record<string, unknown>;
      }
    }
    obj[keys[keys.length - 1]] = value;

    await writeContent(content);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Content API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
