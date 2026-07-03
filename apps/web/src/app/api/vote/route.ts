import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { refreshSnapshot, getBattleVoteCounts } from "@/lib/signal-engine";

// Source row never changes at runtime — cache after first load.
let cachedSourceId: string | null = null;
async function getWebsiteSourceId(): Promise<string | null> {
  if (cachedSourceId) return cachedSourceId;
  const source = await db.source.findUnique({ where: { name: "Website" } });
  if (source) cachedSourceId = source.id;
  return cachedSourceId ?? null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { battleSlug, subjectSlug, anonymousId } = body as {
      battleSlug?: string;
      subjectSlug?: string;
      anonymousId?: string;
    };

    if (
      typeof battleSlug !== "string" || battleSlug.length === 0 || battleSlug.length > 120 ||
      typeof subjectSlug !== "string" || subjectSlug.length === 0 || subjectSlug.length > 120 ||
      typeof anonymousId !== "string" || anonymousId.length === 0 || anonymousId.length > 128
    ) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const [[battle, subject], sourceId] = await Promise.all([
      Promise.all([
        db.battle.findUnique({ where: { slug: battleSlug } }),
        db.subject.findUnique({ where: { slug: subjectSlug } }),
      ]),
      getWebsiteSourceId(),
    ]);

    if (!battle) return NextResponse.json({ error: "Battle not found" }, { status: 404 });
    if (!subject) return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    if (!sourceId) return NextResponse.json({ error: "Source not configured" }, { status: 500 });

    // Validate the subject is actually part of this battle
    if (subject.id !== battle.subjectAId && subject.id !== battle.subjectBId) {
      return NextResponse.json({ error: "Subject not in this battle" }, { status: 400 });
    }

    try {
      await db.vote.create({
        data: {
          battleId: battle.id,
          subjectId: subject.id,
          sourceId,
          anonymousId,
        },
      });
    } catch (e: unknown) {
      const err = e as { code?: string };
      if (err?.code === "P2002") {
        // Already voted — return current counts without error (idempotent)
        const counts = await getBattleVoteCounts(battle.id, battle.subjectAId, battle.subjectBId);
        return NextResponse.json({ ok: true, duplicate: true, counts });
      }
      throw e;
    }

    // Refresh snapshots for both subjects (non-blocking from caller's perspective)
    await Promise.all([
      refreshSnapshot(battle.subjectAId),
      refreshSnapshot(battle.subjectBId),
    ]);

    const counts = await getBattleVoteCounts(battle.id, battle.subjectAId, battle.subjectBId);
    return NextResponse.json({ ok: true, counts });
  } catch (error) {
    console.error("[/api/vote]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
