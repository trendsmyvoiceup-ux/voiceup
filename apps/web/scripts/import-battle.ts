/**
 * import-battle — bridge between the pipeline filesystem and the Neon database.
 *
 * Reads output/battles/<slug>/battle.json and upserts Subject A, Subject B,
 * the Battle record, and the "Website" Source into the database.
 * Safe to re-run: all operations are idempotent (upsert by unique key).
 *
 * Usage (run from apps/web/):
 *   npx tsx scripts/import-battle.ts <slug>
 *
 * Example:
 *   npx tsx scripts/import-battle.ts apple-vs-android
 *
 * Exit codes:
 *   0 — success
 *   1 — usage error, battle not found, DB error
 */

import * as path from "path";
import * as fs from "fs";
import * as crypto from "crypto";
import * as dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const WORKSPACE_ROOT = path.resolve(__dirname, "../../..");
const BATTLES_DIR    = path.join(WORKSPACE_ROOT, "output", "battles");

function cuid(): string {
  return `c${Date.now().toString(36)}${crypto.randomBytes(6).toString("hex")}`;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

type BattleJson = {
  id: string;
  category: string;
  visualTheme?: string;
  subjectA: { name: string; mediaLabel?: string; mediaHint?: string };
  subjectB: { name: string; mediaLabel?: string; mediaHint?: string };
};

async function run(slug: string): Promise<void> {
  // ── Read battle.json ───────────────────────────────────────────────────────

  const battleDir  = path.join(BATTLES_DIR, slug);
  const battlePath = path.join(battleDir, "battle.json");

  if (!fs.existsSync(battlePath)) {
    console.error(`Error: battle package not found at ${battleDir}`);
    console.error("Run the pipeline first: node scripts/run-pipeline.ts <category>");
    process.exit(1);
  }

  const battle = JSON.parse(fs.readFileSync(battlePath, "utf-8")) as BattleJson;
  const nameA = battle.subjectA.name;
  const nameB = battle.subjectB.name;
  const slugA = slugify(nameA);
  const slugB = slugify(nameB);
  const title = `${nameA} vs ${nameB}`;
  const { category } = battle;

  console.log(`Importing: ${title} (${category})`);

  // ── Connect ────────────────────────────────────────────────────────────────

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("Error: DATABASE_URL not set. Check apps/web/.env");
    process.exit(1);
  }

  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // ── Ensure "Website" source exists ─────────────────────────────────────
    const srcRes = await client.query<{ id: string }>(
      `INSERT INTO "Source" (id, name, type, "trustScore", "createdAt")
       VALUES ($1, 'Website', 'website', 1.0, NOW())
       ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
      [cuid()]
    );
    const sourceId = srcRes.rows[0].id;
    console.log(`  ✔ Source "Website" — ${sourceId}`);

    // ── Upsert Subject A ───────────────────────────────────────────────────
    const subARes = await client.query<{ id: string }>(
      `INSERT INTO "Subject" (id, slug, name, category, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = NOW()
       RETURNING id`,
      [cuid(), slugA, nameA, category]
    );
    const subjectAId = subARes.rows[0].id;
    console.log(`  ✔ Subject A: ${nameA} (${slugA}) — ${subjectAId}`);

    // ── Upsert Subject B ───────────────────────────────────────────────────
    const subBRes = await client.query<{ id: string }>(
      `INSERT INTO "Subject" (id, slug, name, category, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = NOW()
       RETURNING id`,
      [cuid(), slugB, nameB, category]
    );
    const subjectBId = subBRes.rows[0].id;
    console.log(`  ✔ Subject B: ${nameB} (${slugB}) — ${subjectBId}`);

    // ── Upsert Battle ──────────────────────────────────────────────────────
    const battleRes = await client.query<{ id: string }>(
      `INSERT INTO "Battle" (id, slug, title, category, "subjectAId", "subjectBId", status, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, 'active', NOW(), NOW())
       ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, "updatedAt" = NOW()
       RETURNING id`,
      [cuid(), slug, title, category, subjectAId, subjectBId]
    );
    const battleId = battleRes.rows[0].id;
    console.log(`  ✔ Battle: ${slug} — ${battleId}`);

    await client.query("COMMIT");

    console.log(`\nDone. Battle live at /battle/${slug}`);

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Database error:", err instanceof Error ? err.message : err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: npx tsx scripts/import-battle.ts <slug>");
  console.error("Example: npx tsx scripts/import-battle.ts apple-vs-android");
  process.exit(1);
}

run(slug);
