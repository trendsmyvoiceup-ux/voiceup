import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBattleVoteCounts } from "@/lib/signal-engine";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const battle = await db.battle.findUnique({ where: { slug } });

    if (!battle) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const counts = await getBattleVoteCounts(battle.id, battle.subjectAId, battle.subjectBId);
    return NextResponse.json(counts);
  } catch (error) {
    console.error("[/api/battles/[slug]/votes]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
