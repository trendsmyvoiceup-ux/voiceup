import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const REPO_ROOT      = path.resolve(process.cwd(), "..", "..");
const PUBLISHED_DIR  = path.join(REPO_ROOT, "output", "published");

const CANDIDATES = ["image.png", "image.webp", "image.jpg"] as const;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tiktokDir = path.join(PUBLISHED_DIR, slug, "tiktok");

  for (const filename of CANDIDATES) {
    const filepath = path.join(tiktokDir, filename);
    if (fs.existsSync(filepath)) {
      const buf  = fs.readFileSync(filepath);
      const ext  = path.extname(filename).slice(1);
      const mime = ext === "webp" ? "image/webp" : ext === "jpg" ? "image/jpeg" : "image/png";
      return new NextResponse(buf, {
        headers: {
          "Content-Type": mime,
          "Cache-Control": "private, max-age=60",
        },
      });
    }
  }

  return new NextResponse(null, { status: 404 });
}
