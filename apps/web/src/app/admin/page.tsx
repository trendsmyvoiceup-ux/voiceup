import fs from "fs";
import path from "path";
import { comparisons } from "@/lib/comparisons";
import { slugify } from "@/lib/subjects";
import { AdminBattleTable, type AdminBattleRow } from "@/components/admin/admin-battle-table";

// Internal prototype: reads the Content Factory's local filesystem state
// on every request. Not suitable for a real production admin surface.
export const dynamic = "force-dynamic";

// output/ lives at the repo root, two levels above apps/web.
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

export default function AdminPage() {
  const proposalsDir = path.join(OUTPUT_DIR, "proposals");
  const battlesDir = path.join(OUTPUT_DIR, "battles");
  const publishedDir = path.join(OUTPUT_DIR, "published");
  const reportsDir = path.join(OUTPUT_DIR, "reports");

  const battles: AdminBattleRow[] = comparisons.map((c) => ({
    slug: c.id,
    title: `${c.subjectA.name} vs ${c.subjectB.name}`,
    category: c.category,
    websiteUrl: `/battle/${c.id}`,
    subjectASlug: slugify(c.subjectA.name),
    subjectBSlug: slugify(c.subjectB.name),
    subjectAName: c.subjectA.name,
    subjectBName: c.subjectB.name,
    hasProposal: exists(path.join(proposalsDir, `${c.id}.json`)),
    hasPackage: exists(path.join(battlesDir, c.id)),
  }));

  const factoryCounts = {
    proposals: countEntries(proposalsDir),
    battlePackages: countEntries(battlesDir),
    published: countEntries(publishedDir),
    reports: countEntries(reportsDir),
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <div className="rounded-2xl border border-amber-400/40 bg-amber-50 p-4 text-sm font-medium text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
        ⚠ Internal prototype. Local state only. Not production admin.
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Battle Control Room</h1>
        <p className="text-sm text-muted-foreground">
          Monitor existing battles and the Content Factory&apos;s local output.
        </p>
      </div>

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

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Battles
        </h2>
        <AdminBattleTable battles={battles} />
      </section>
    </main>
  );
}

function FactoryStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
