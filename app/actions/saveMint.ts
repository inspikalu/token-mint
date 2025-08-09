// app/actions/saveMint.ts
"use server";

import fs from "node:fs/promises";
import path from "node:path";

export async function saveMint(data: {
  name: string;
  ticker: string;
  image: string;
  transferHookProgramId?: string;
  decimals?: number;
  mintAddress: string;
  signature: string;
  creator: string;
  createdAt: string;
}) {
  const dirPath = path.join(process.cwd(), "data");
  const filePath = path.join(dirPath, "tokens.json");

  // Ensure the data directory exists
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {}

  let tokens: any[] = [];
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    tokens = JSON.parse(fileData);
  } catch {
    // File doesn't exist or invalid, start with empty array
  }

  tokens.push(data);

  await fs.writeFile(filePath, JSON.stringify(tokens, null, 2));
}