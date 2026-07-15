import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const REPO_ROOT   = path.resolve(process.cwd(), "..", "..");
const BATTLES_DIR = path.join(REPO_ROOT, "output", "battles");

function cuid(): string {
  return `c${Date.now().toString(36)}${crypto.randomBytes(6).toString("hex")}`;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

type BattleJson = {
  category: string;
  subjectA: { name: string };
  subjectB: { name: string };
};

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // ── Guard: must be approved ────────────────────────────────────────────────
  const approval = await db.battleApproval.findUnique({ where: { slug } });
  if (!approval || approval.status !== "approved") {
    return NextResponse.json(
      { error: "Battle must be approved before publishing." },
      { status: 403 }
    );
  }

  // ── Read battle package ────────────────────────────────────────────────────
  const battlePath = path.join(BATTLES_DIR, slug, "battle.json");
  if (!fs.existsSync(battlePath)) {
    return NextResponse.json(
      { error: `Battle package not found: output/battles/${slug}/battle.json` },
      { status: 404 }
    );
  }

  const battle = JSON.parse(fs.readFileSync(battlePath, "utf-8")) as BattleJson;
  const nameA    = battle.subjectA.name;
  const nameB    = battle.subjectB.name;
  const slugA    = slugify(nameA);
  const slugB    = slugify(nameB);
  const title    = `${nameA} vs ${nameB}`;
  const category = battle.category;

  // ── Upsert into DB (idempotent) ────────────────────────────────────────────
  // Source
  const source = await db.source.upsert({
    where: { name: "Website" },
    create: { id: cuid(), name: "Website", type: "website", trustScore: 1.0 },
    update: {},
  });

  // Subjects
  const subjectA = await db.subject.upsert({
    where: { slug: slugA },
    create: { id: cuid(), slug: slugA, name: nameA, category },
    update: { name: nameA },
  });
  const subjectB = await db.subject.upsert({
    where: { slug: slugB },
    create: { id: cuid(), slug: slugB, name: nameB, category },
    update: { name: nameB },
  });

  // Battle — never touch votes; only update metadata
  await db.battle.upsert({
    where: { slug },
    create: {
      id: cuid(),
      slug,
      title,
      category,
      subjectAId: subjectA.id,
      subjectBId: subjectB.id,
      status: "active",
    },
    update: {
      title,
      category,
      // subjectAId / subjectBId intentionally not updated to avoid orphaning votes
    },
  });

  // ── Mark published (audit trail) ──────────────────────────────────────────
  const now = new Date();
  const isRepublish = Boolean(approval.publishedAt);
  const updated = await db.battleApproval.update({
    where: { slug },
    data: {
      publishedWebsiteAt: now,
      publishedBy: "founder",
      publishedAt: isRepublish ? approval.publishedAt : now,
      republishedAt: isRepublish ? now : null,
    },
  });

  void source; // used for upsert side-effect only

  return NextResponse.json({
    ok: true,
    slug,
    url: `/battle/${slug}`,
    publishedWebsiteAt: updated.publishedWebsiteAt,
  });
}
