// Entry for the-picture-that-tastes-of-one-20261122-2047.
// Copies the hero image (one perfectly ripe mango, halved) to the
// make.fun output directory as entry.png.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// PNG files start with this 8-byte signature; refuse anything else so a
// corrupt or misplaced source image can never be submitted silently.
const PNG_SIGNATURE = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
const outPath = join(outDir, "entry.png");

const bytes = readFileSync(sourcePath);
if (!bytes.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
  throw new Error(`Not a valid PNG: ${sourcePath}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, bytes);
console.log(`Wrote ${outPath} (${bytes.length} bytes)`);
