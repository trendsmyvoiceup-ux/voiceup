import fs from "fs";
import path from "path";
import { comparisons } from "@/lib/comparisons";
import { slugify } from "@/lib/subjects";
import { AdminBattleTable, type AdminBattleRow } from "@/components/admin/admin-battle-table";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const REPO_ROOT = path.resolve(process.cwd(), "..", "..");
const OUTPUT_DIR = path.join(REPO_ROOT, "output");

function countEntries(dir: string): number {
  try {
    return fs.readdirSync(dir).length;
  } catch {
    return 0;
  }
}

function exists(p: string): boolean {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

function readReview(battleDir: string): { overall: number; approved: boolean } | null {
  try {
    const raw = fs.readFileSync(path.join(battleDir, "review.json"), "utf-8");
    const parsed = JSON.parse(raw);
    return { overall: parsed.overall, approved: parsed.approved };
  } catch {
    return null;
  }
}

type ConsumerStatus = "pending" | "done" | "approved" | "rejected" | "unknown";

function readConsumerStatus(battleDir: string, key: string): ConsumerStatus {
  try {
    const raw = fs.readFileSync(path.join(battleDir, "status.json"), "utf-8");
    const parsed = JSON.parse(raw);
    return parsed?.[key]?.status ?? "unknown";
  } catch {
    return "unknown";
  }
}

type LatestReport = {
  category: string;
  finishedAt: string;
  totalBattles: number;
  approved: number;
  rejected: number;
  averageScore: number;
} | null;

function readLatestReport(reportsDir: string): LatestReport {
  try {
    const files = fs.readdirSync(reportsDir).filter((f: string) => f.endsWith(".json"));
    if (files.length === 0) return null;
    const latest = files.sort().at(-1)!;
    const raw = fs.readFileSync(path.join(reportsDir, latest), "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function getRuntimeStats() {
  try {
    const [totalVotes, totalBattles, totalSubjects, recentVotes] = await Promise.all([
      db.vote.count(),
      db.battle.count(),
      db.subject.count(),
      db.vote.count({ where: { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } } }),
    ]);

    const latestVote = await db.vote.findFirst({ orderBy: { createdAt: "desc" } });

    return { totalVotes, totalBattles, totalSubjects, recentVotes, latestVote };
  } catch {
    return null;
  }
}

export default async function AdminPage() {
  const proposalsDir = path.join(OUTPUT_DIR, "proposals");
  const battlesDir = path.join(OUTPUT_DIR, "battles");
  const publishedDir = path.join(OUTPUT_DIR, "published");
  const reportsDir = path.join(OUTPUT_DIR, "reports");

  const [runtimeStats] = await Promise.all([getRuntimeStats()]);

  const battles: AdminBattleRow[] = comparisons.map((c) => {
    const battleDir = path.join(battlesDir, c.id);
    const review = readReview(battleDir);
    const packageGenerated = exists(path.join(publishedDir, c.id));

    return {
      slug: c.id,
      title: `${c.subjectA.name} vs ${c.subjectB.name}`,
      category: c.category,
      websiteUrl: `/battle/${c.id}`,
      subjectASlug: slugify(c.subjectA.name),
      subjectBSlug: slugify(c.subjectB.name),
      subjectAName: c.subjectA.name,
      subjectBName: c.subjectB.name,
      hasProposal: exists(path.join(proposalsDir, `${c.id}.json`)),
      hasPackage: exists(battleDir),
      reviewScore: review?.overall ?? null,
      reviewApproved: review?.approved ?? null,
      websiteStatus: readConsumerStatus(battleDir, "website"),
      publisherStatus: readConsumerStatus(battleDir, "publisher"),
      packageGenerated,
      readyForPublication: review?.approved === true,
    };
  });

  const factoryCounts = {
    proposals: countEntries(proposalsDir),
    battlePackages: countEntries(battlesDir),
    published: countEntries(publishedDir),
    reports: countEntries(reportsDir),
  };

  const latestReport = readLatestReport(reportsDir);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <div className="rounded-2xl border border-amber-400/40 bg-amber-50 p-4 text-sm font-medium text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
        ⚠ Internal. Not linked from public navigation.
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Battle Control Room</h1>
        <p className="text-sm text-muted-foreground">
          Runtime database · Content Factory state · Latest activity
        </p>
      </div>

      {/* Runtime stats */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Runtime Database</h2>
        {runtimeStats ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <FactoryStat label="Total votes" value={runtimeStats.totalVotes.toLocaleString()} />
            <FactoryStat label="Votes (24h)" value={runtimeStats.recentVotes.toLocaleString()} />
            <FactoryStat label="Battles in DB" value={runtimeStats.totalBattles} />
            <FactoryStat label="Subjects in DB" value={runtimeStats.totalSubjects} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Database not connected. Set{" "}
            <code className="rounded bg-muted px-1">DATABASE_URL</code> and run{" "}
            <code className="rounded bg-muted px-1">prisma migrate deploy</code>.
          </p>
        )}
        {runtimeStats?.latestVote && (
          <p className="text-xs text-muted-foreground">
            Last vote: {new Date(runtimeStats.latestVote.createdAt).toLocaleString()}
          </p>
        )}
      </section>

      {/* Content Factory */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Content Factory
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <FactoryStat label="Proposals" value={factoryCounts.proposals} />
          <FactoryStat label="Battle packages" value={factoryCounts.battlePackages} />
          <FactoryStat label="Published packages" value={factoryCounts.published} />
          <FactoryStat label="Reports" value={factoryCounts.reports} />
        </div>
      </section>

      {/* Latest pipeline report */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Latest Pipeline Report
        </h2>
        {latestReport ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <FactoryStat
              label="Last execution"
              value={new Date(latestReport.finishedAt).toLocaleString()}
            />
            <FactoryStat label="Approved" value={latestReport.approved} />
            <FactoryStat label="Rejected" value={latestReport.rejected} />
            <FactoryStat label="Average score" value={latestReport.averageScore} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No pipeline reports yet. Run{" "}
            <code className="rounded bg-muted px-1">node scripts/run-pipeline.ts &lt;category&gt;</code>.
          </p>
        )}
      </section>

      {/* Battles */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Battles
        </h2>
        <AdminBattleTable battles={battles} />
      </section>
    </main>
  );
}

function FactoryStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
