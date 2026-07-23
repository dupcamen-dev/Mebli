import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";
import { kvSetContent, kvSetCategories } from "@/lib/kv";
import { readFile } from "fs/promises";
import path from "path";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentPath = path.join(process.cwd(), "data", "content.json");
    const categoriesPath = path.join(process.cwd(), "data", "categories.json");

    const contentData = JSON.parse(await readFile(contentPath, "utf-8"));
    const categoriesData = JSON.parse(await readFile(categoriesPath, "utf-8"));

    const contentOk = await kvSetContent(contentData);
    const categoriesOk = await kvSetCategories(categoriesData);

    return NextResponse.json({
      success: contentOk && categoriesOk,
      content: contentOk,
      categories: categoriesOk,
    });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
