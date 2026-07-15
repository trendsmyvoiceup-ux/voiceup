import fs from "fs";
import path from "path";
import Link from "next/link";
import type { StudioBattle, PipelineStatus, StudioStats } from "@/types/studio";
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
  const hasTikTokImage = hasTikTok && ["image.png", "image.webp", "image.jpg"].some(f => tryExists(path.join(tiktokDir, f)));

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
    hasTikTokImage,
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
    dbApproval:     null,
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

function computeStats(battles: StudioBattle[]): StudioStats {
  const scored = battles.filter(b => b.reviewScore !== null);
  return {
    total:        battles.length,
    reviewed:     scored.length,
    approved:     battles.filter(b => b.reviewApproved === true).length,
    rejected:     battles.filter(b => b.reviewApproved === false).length,
    withTikTok:   battles.filter(b => b.hasTikTokPackage).length,
    withPublished: battles.filter(b => b.hasPublishedPackage).length,
    avgScore:     scored.length > 0
      ? Math.round(scored.reduce((s, b) => s + (b.reviewScore ?? 0), 0) / scored.length)
      : null,
  };
}

export default function StudioPage() {
  const battles = readAllBattles();
  const stats   = computeStats(battles);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10">
      {/* Internal banner */}
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-amber-400/20 bg-amber-950/20 px-4 py-2.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/60">Internal</span>
        <span className="text-xs text-amber-300/40">
          Creator Studio — not linked from public navigation.
        </span>
        <Link
          href="/admin"
          className="ml-auto text-[10px] text-white/20 transition-colors hover:text-white/50"
        >
          ← Admin
        </Link>
      </div>

      {/* Page header */}
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Human Signal Studio
          </h1>
          <p className="mt-1.5 text-sm text-white/35">
            AI-powered production pipeline for Human Signals.
          </p>
        </div>
      </div>

      <StudioDashboard battles={battles} stats={stats} />
    </main>
  );
}
