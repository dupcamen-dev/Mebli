import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";
import { kvGetCategories, kvSetCategories } from "@/lib/kv";
import { readFile } from "fs/promises";
import path from "path";

const CATEGORIES_FILE = path.join(process.cwd(), "data", "categories.json");

async function getInitialCategories() {
  try {
    const data = await readFile(CATEGORIES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function getCategories(): Promise<Record<string, unknown>[]> {
  const kv = await kvGetCategories();
  if (kv && Array.isArray(kv)) return kv as Record<string, unknown>[];
  return getInitialCategories();
}

async function handleJsonAction(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { action, category, photo, targetCategory, index, toIndex } = body;
  const categories = await getCategories();

  switch (action) {
    case "move": {
      const catIdx = categories.findIndex((c) => c.slug === category);
      const targetCatIdx = categories.findIndex((c) => c.slug === targetCategory);
      if (catIdx === -1 || targetCatIdx === -1) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 });
      }

      const srcPhotos = categories[catIdx].photos as { src: string; alt: string }[];
      const photoIdx = srcPhotos.findIndex((p) => p.src === photo.src);
      if (photoIdx === -1) {
        return NextResponse.json({ error: "Photo not found" }, { status: 400 });
      }

      const [movedPhoto] = srcPhotos.splice(photoIdx, 1);
      (categories[targetCatIdx].photos as { src: string; alt: string }[]).push(movedPhoto);

      await kvSetCategories(categories);
      return NextResponse.json({ success: true, photo: movedPhoto });
    }

    case "reorder": {
      const catIdx = categories.findIndex((c) => c.slug === category);
      if (catIdx === -1) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 });
      }

      const photos = categories[catIdx].photos as { src: string; alt: string }[];
      const [movedPhoto] = photos.splice(index, 1);
      photos.splice(toIndex, 0, movedPhoto);

      await kvSetCategories(categories);
      return NextResponse.json({ success: true });
    }

    case "delete": {
      const catIdx = categories.findIndex((c) => c.slug === category);
      if (catIdx === -1) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 });
      }

      const photos = categories[catIdx].photos as { src: string; alt: string }[];
      const photoIdx = photos.findIndex((p) => p.src === photo.src);
      if (photoIdx === -1) {
        return NextResponse.json({ error: "Photo not found" }, { status: 400 });
      }

      photos.splice(photoIdx, 1);

      await kvSetCategories(categories);
      return NextResponse.json({ success: true });
    }

    case "updateAlt": {
      const catIdx = categories.findIndex((c) => c.slug === category);
      if (catIdx === -1) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 });
      }

      const photos = categories[catIdx].photos as { src: string; alt: string }[];
      const photoIdx = photos.findIndex((p) => p.src === photo.src);
      if (photoIdx === -1) {
        return NextResponse.json({ error: "Photo not found" }, { status: 400 });
      }

      photos[photoIdx].alt = photo.alt;

      await kvSetCategories(categories);
      return NextResponse.json({ success: true });
    }

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handleJsonAction(req);
  } catch (err) {
    console.error("Photo API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categories = await getCategories();
    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
