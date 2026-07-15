import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { StudioBattle, PipelineStatus, DbApproval } from "@/types/studio";
import { BattlePreviewPanel } from "@/components/studio/battle-preview-panel";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const REPO_ROOT    = path.resolve(process.cwd(), "..", "..");
const BATTLES_DIR  = path.join(REPO_ROOT, "output", "battles");
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
    reviewScore    = typeof r.overall   === "number"  ? r.overall   : null;
    reviewApproved = typeof r.approved  === "boolean" ? r.approved  : null;
    reviewedAt     = typeof r.reviewedAt === "string" ? r.reviewedAt : null;
  } catch {}

  const tiktokDir = path.join(PUBLISHED_DIR, slug, "tiktok");
  const hasTikTok = tryExists(tiktokDir);
  const sa = (b.subjectA as { name?: string })?.name ?? "Unknown";
  const sb = (b.subjectB as { name?: string })?.name ?? "Unknown";

  return {
    slug,
    title:     `${sa} vs ${sb}`,
    subjectA:  sa,
    subjectB:  sb,
    category:  typeof b.category === "string" ? b.category : "Unknown",
    reviewScore,
    reviewApproved,
    reviewedAt,
    hasTikTokPackage:    hasTikTok,
    hasPublishedPackage: tryExists(path.join(PUBLISHED_DIR, slug)),
    tiktok: hasTikTok ? {
      caption:          tryRead(path.join(tiktokDir, "caption.txt")),
      script:           tryRead(path.join(tiktokDir, "script.txt")),
      hashtags:         tryRead(path.join(tiktokDir, "hashtags.txt")),
      videoPrompt:      tryRead(path.join(tiktokDir, "video_prompt.txt")),
      imagePrompt:      tryRead(path.join(tiktokDir, "image_prompt.txt")),
      battleLink:       tryRead(path.join(tiktokDir, "battle_link.txt"))?.split("\n")[0] ?? null,
      postingChecklist: tryRead(path.join(tiktokDir, "posting_checklist.md")),
    } : null,
    battleCaption:  tryRead(path.join(battleDir, "caption.txt")),
    battleHashtags: tryRead(path.join(battleDir, "hashtags.txt")),
    battleScript:   tryRead(path.join(battleDir, "script.txt")),
    pipeline:       readPipeline(battleDir),
    dbApproval:     null, // filled in by caller
  };
}

export default function StudioPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <AsyncStudioPreviewPage params={params} />;
}

async function AsyncStudioPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const battle = readBattle(slug);
  if (!battle) notFound();

  let dbApproval: DbApproval = null;
  try {
    const row = await db.battleApproval.findUnique({ where: { slug } });
    if (row) {
      dbApproval = {
        status: row.status as "approved" | "rejected" | "needs_changes",
        note: row.note,
        approvedBy: row.approvedBy ?? null,
        approvedAt: row.approvedAt?.toISOString() ?? null,
        publishedBy: row.publishedBy ?? null,
        publishedAt: row.publishedAt?.toISOString() ?? null,
        republishedAt: row.republishedAt?.toISOString() ?? null,
        publishedWebsiteAt: row.publishedWebsiteAt?.toISOString() ?? null,
        updatedAt: row.updatedAt.toISOString(),
      };
    }
  } catch {}
  battle.dbApproval = dbApproval;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <Link
          href="/studio"
          className="text-sm text-white/30 transition-colors hover:text-white/60"
        >
          ← Studio
        </Link>
        <span className="rounded-full border border-amber-400/30 bg-amber-950/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300/80">
          Internal
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">{battle.title}</h1>
        <div className="mt-1.5 flex items-center gap-3 text-sm text-white/40">
          <span>{battle.category}</span>
          {battle.reviewScore !== null && (
            <>
              <span>·</span>
              <span>
                Reviewer score:{" "}
                <span className={battle.reviewApproved ? "text-emerald-400/80" : "text-rose-400/80"}>
                  {battle.reviewScore}/100
                </span>
              </span>
            </>
          )}
        </div>
      </div>

      <BattlePreviewPanel battle={battle} />
    </main>
  );
}
