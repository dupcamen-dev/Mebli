import { Redis } from "@upstash/redis";

let _redis: Redis | null = null;

function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

const KEYS = {
  content: "mebli:content",
  categories: "mebli:categories",
} as const;

export async function kvGetContent(): Promise<Record<string, unknown> | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const data = await redis.get(KEYS.content);
    return data as Record<string, unknown> | null;
  } catch {
    return null;
  }
}

export async function kvSetContent(content: Record<string, unknown>): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  try {
    await redis.set(KEYS.content, content);
    return true;
  } catch {
    return false;
  }
}

export async function kvGetCategories(): Promise<unknown[] | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const data = await redis.get(KEYS.categories);
    return data as unknown[] | null;
  } catch {
    return null;
  }
}

export async function kvSetCategories(categories: unknown[]): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  try {
    await redis.set(KEYS.categories, categories);
    return true;
  } catch {
    return false;
  }
}

export function kvAvailable(): boolean {
  return getRedis() !== null;
}
