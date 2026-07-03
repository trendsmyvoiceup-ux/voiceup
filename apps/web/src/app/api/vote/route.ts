import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { refreshSnapshot, getBattleVoteCounts } from "@/lib/signal-engine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { battleSlug, subjectSlug, anonymousId } = body as {
      battleSlug?: string;
      subjectSlug?: string;
      anonymousId?: string;
    };

    if (!battleSlug || !subjectSlug || !anonymousId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [battle, subject, source] = await Promise.all([
      db.battle.findUnique({ where: { slug: battleSlug } }),
      db.subject.findUnique({ where: { slug: subjectSlug } }),
      db.source.findUnique({ where: { name: "Website" } }),
    ]);

    if (!battle) return NextResponse.json({ error: "Battle not found" }, { status: 404 });
    if (!subject) return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    if (!source) return NextResponse.json({ error: "Source not configured" }, { status: 500 });

    // Validate the subject is actually part of this battle
    if (subject.id !== battle.subjectAId && subject.id !== battle.subjectBId) {
      return NextResponse.json({ error: "Subject not in this battle" }, { status: 400 });
    }

    try {
      await db.vote.create({
        data: {
          battleId: battle.id,
          subjectId: subject.id,
          sourceId: source.id,
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
