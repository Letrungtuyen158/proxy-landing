import "server-only";

import { promises as fs } from "fs";
import path from "path";

export function getDataFilePath(filename: string): string {
  if (process.env.VERCEL) {
    return `/tmp/proxyforge-${filename}`;
  }
  return path.join(process.cwd(), "data", filename);
}

export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  const filePath = getDataFilePath(filename);
  const dir = path.dirname(filePath);

  if (!process.env.VERCEL) {
    await fs.mkdir(dir, { recursive: true });
  }

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    if (!process.env.VERCEL) {
      await fs.writeFile(filePath, JSON.stringify(fallback, null, 2) + "\n", "utf-8");
    }
    return fallback;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = getDataFilePath(filename);
  const dir = path.dirname(filePath);

  if (!process.env.VERCEL) {
    await fs.mkdir(dir, { recursive: true });
  }

  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
