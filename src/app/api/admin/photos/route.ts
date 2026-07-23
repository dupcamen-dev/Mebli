import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";
import { readFile, writeFile, unlink, rename, mkdir, readdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "categories.json");
const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");

async function readCategories() {
  const data = await readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

async function writeCategories(categories: unknown[]) {
  await writeFile(DATA_FILE, JSON.stringify(categories, null, 2), "utf-8");
}

async function getNextFilename(dir: string, prefix: string): Promise<string> {
  let files: string[] = [];
  try {
    files = (await readdir(dir)).filter((f) => f.startsWith(prefix) && f.endsWith(".jpg"));
  } catch {}
  let max = 0;
  for (const f of files) {
    const num = parseInt(f.replace(prefix, "").replace(".jpg", "").replace("-", ""), 10);
    if (num > max) max = num;
  }
  return `${prefix}${max + 1}.jpg`;
}

async function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function handleJsonAction(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { action, category, photo, targetCategory, index, toIndex } = body;
  const categories = await readCategories();

  switch (action) {
    case "move": {
      const catIdx = categories.findIndex((c: { slug: string }) => c.slug === category);
      const targetCatIdx = categories.findIndex((c: { slug: string }) => c.slug === targetCategory);
      if (catIdx === -1 || targetCatIdx === -1) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 });
      }

      const photoIdx = categories[catIdx].photos.findIndex((p: { src: string }) => p.src === photo.src);
      if (photoIdx === -1) {
        return NextResponse.json({ error: "Photo not found" }, { status: 400 });
      }

      const [movedPhoto] = categories[catIdx].photos.splice(photoIdx, 1);

      const oldPath = path.join(process.cwd(), "public", movedPhoto.src);
      const newFilename = await getNextFilename(path.join(GALLERY_DIR, targetCategory), `${targetCategory}-`);
      const newPath = path.join(GALLERY_DIR, targetCategory, newFilename);

      await ensureDir(path.join(GALLERY_DIR, targetCategory));
      await rename(oldPath, newPath);

      movedPhoto.src = `/gallery/${targetCategory}/${newFilename}`;
      categories[targetCatIdx].photos.push(movedPhoto);

      await writeCategories(categories);
      return NextResponse.json({ success: true, photo: movedPhoto });
    }

    case "reorder": {
      const catIdx = categories.findIndex((c: { slug: string }) => c.slug === category);
      if (catIdx === -1) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 });
      }

      const [movedPhoto] = categories[catIdx].photos.splice(index, 1);
      categories[catIdx].photos.splice(toIndex, 0, movedPhoto);

      await writeCategories(categories);
      return NextResponse.json({ success: true });
    }

    case "delete": {
      const catIdx = categories.findIndex((c: { slug: string }) => c.slug === category);
      if (catIdx === -1) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 });
      }

      const photoIdx = categories[catIdx].photos.findIndex((p: { src: string }) => p.src === photo.src);
      if (photoIdx === -1) {
        return NextResponse.json({ error: "Photo not found" }, { status: 400 });
      }

      const filePath = path.join(process.cwd(), "public", photo.src);
      if (existsSync(filePath)) {
        await unlink(filePath);
      }

      categories[catIdx].photos.splice(photoIdx, 1);

      await writeCategories(categories);
      return NextResponse.json({ success: true });
    }

    case "updateAlt": {
      const catIdx = categories.findIndex((c: { slug: string }) => c.slug === category);
      if (catIdx === -1) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 });
      }

      const photoIdx = categories[catIdx].photos.findIndex((p: { src: string }) => p.src === photo.src);
      if (photoIdx === -1) {
        return NextResponse.json({ error: "Photo not found" }, { status: 400 });
      }

      categories[catIdx].photos[photoIdx].alt = photo.alt;

      await writeCategories(categories);
      return NextResponse.json({ success: true });
    }

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}

async function handleUpload(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const category = formData.get("category") as string;
  const files = formData.getAll("files") as File[];

  if (!category || !files.length) {
    return NextResponse.json({ error: "Missing category or files" }, { status: 400 });
  }

  const categories = await readCategories();
  const catIdx = categories.findIndex((c: { slug: string }) => c.slug === category);
  if (catIdx === -1) {
    return NextResponse.json({ error: "Category not found" }, { status: 400 });
  }

  const catDir = path.join(GALLERY_DIR, category);
  await ensureDir(catDir);

  const uploaded: { src: string; alt: string }[] = [];
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = await getNextFilename(catDir, `${category}-`);
    const filePath = path.join(catDir, filename);
    await writeFile(filePath, buffer);

    const src = `/gallery/${category}/${filename}`;
    const photoEntry = { src, alt: file.name.replace(/\.[^.]+$/, "") };
    categories[catIdx].photos.push(photoEntry);
    uploaded.push(photoEntry);
  }

  await writeCategories(categories);
  return NextResponse.json({ success: true, photos: uploaded });
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      return await handleUpload(req);
    }
    return await handleJsonAction(req);
  } catch (err) {
    console.error("Photo API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categories = await readCategories();
    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
