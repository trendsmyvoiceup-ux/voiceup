import fs from "fs";
import path from "path";
import Link from "next/link";
import type { StudioBattle, PipelineStatus } from "@/types/studio";
import { StudioDashboard } from "@/components/studio/studio-dashboard";

export const dynamic = "force-dynamic";

const REPO_ROOT   = path.resolve(process.cwd(), "..", "..");
const BATTLES_DIR = path.join(REPO_ROOT, "output", "battles");
const PUBLISHED_DIR = path.join(REPO_ROOT, "output", "published");

function tryRead(p: string): string | null {
  try { return fs.readFileSync(p, "utf-8").trim(); } catch { return null; }
}

function tryExists(p: string): boolean {
  try { return fs.existsSync(p); } catch { return false; }
}

function readPipeline(battleDir: string): PipelineStatus {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(battleDir, "status.json"), "utf-8"));
    return {
      reviewer:  raw?.reviewer  ?? null,
      website:   raw?.website   ?? null,
      publisher: raw?.publisher ?? null,
    };
  } catch {
    return { reviewer: null, website: null, publisher: null };
  }
}

function readBattle(slug: string): StudioBattle | null {
  const battleDir = path.join(BATTLES_DIR, slug);
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(fs.readFileSync(path.join(battleDir, "battle.json"), "utf-8"));
  } catch { return null; }

  let reviewScore: number | null = null;
  let reviewApproved: boolean | null = null;
  let reviewedAt: string | null = null;
  try {
    const r = JSON.parse(fs.readFileSync(path.join(battleDir, "review.json"), "utf-8"));
    reviewScore   = typeof r.overall  === "number"  ? r.overall  : null;
    reviewApproved = typeof r.approved === "boolean" ? r.approved : null;
    reviewedAt    = typeof r.reviewedAt === "string" ? r.reviewedAt : null;
  } catch {}

  const tiktokDir  = path.join(PUBLISHED_DIR, slug, "tiktok");
  const hasTikTok  = tryExists(tiktokDir);

  const sa = (b.subjectA as { name?: string })?.name ?? "Unknown";
  const sb = (b.subjectB as { name?: string })?.name ?? "Unknown";

  return {
    slug,
    title:             `${sa} vs ${sb}`,
    subjectA:          sa,
    subjectB:          sb,
    category:          typeof b.category === "string" ? b.category : "Unknown",
    reviewScore,
    reviewApproved,
    reviewedAt,
    hasTikTokPackage:  hasTikTok,
    hasPublishedPackage: tryExists(path.join(PUBLISHED_DIR, slug)),
    tiktok: hasTikTok ? {
      caption:         tryRead(path.join(tiktokDir, "caption.txt")),
      script:          tryRead(path.join(tiktokDir, "script.txt")),
      hashtags:        tryRead(path.join(tiktokDir, "hashtags.txt")),
      videoPrompt:     tryRead(path.join(tiktokDir, "video_prompt.txt")),
      imagePrompt:     tryRead(path.join(tiktokDir, "image_prompt.txt")),
      battleLink:      tryRead(path.join(tiktokDir, "battle_link.txt"))?.split("\n")[0] ?? null,
      postingChecklist: tryRead(path.join(tiktokDir, "posting_checklist.md")),
    } : null,
    battleCaption:  tryRead(path.join(battleDir, "caption.txt")),
    battleHashtags: tryRead(path.join(battleDir, "hashtags.txt")),
    battleScript:   tryRead(path.join(battleDir, "script.txt")),
    pipeline:       readPipeline(battleDir),
  };
}

function readAllBattles(): StudioBattle[] {
  let slugs: string[] = [];
  try {
    slugs = fs
      .readdirSync(BATTLES_DIR)
      .filter((f) => !f.startsWith(".") && fs.statSync(path.join(BATTLES_DIR, f)).isDirectory())
      .sort();
  } catch { return []; }
  return slugs.map(readBattle).filter(Boolean) as StudioBattle[];
}

export default function StudioPage() {
  const battles = readAllBattles();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <div className="rounded-2xl border border-amber-400/40 bg-amber-950/30 px-4 py-3 text-sm font-medium text-amber-200">
        ⚠ Internal — Creator Studio. Not linked from public navigation.
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Creator Studio</h1>
          <p className="mt-1 text-sm text-white/40">
            Generate, preview, approve and prepare battles for social publication.
          </p>
        </div>
        <Link
          href="/admin"
          className="shrink-0 text-xs text-white/25 transition-colors hover:text-white/50"
        >
          ← Admin
        </Link>
      </div>

      <StudioDashboard battles={battles} />
    </main>
  );
}
