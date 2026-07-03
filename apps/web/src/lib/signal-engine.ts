/**
 * Human Signal Engine V1 — deterministic, no AI, no placeholders.
 *
 * Score    – win percentage across all battles the subject has appeared in.
 * Confidence – sample-size factor (log scale, approaches 100 at ~1000 signals).
 * Trend    – difference between recent 7-day win rate and all-time win rate.
 *             Positive = improving, negative = declining, 0 = insufficient data.
 *
 * Every output is recomputable from Vote history alone. SignalSnapshot is a
 * materialized cache; it is never the source of truth.
 */

import { db } from "@/lib/db";

export type SignalResult = {
  score: number;
  confidence: number;
  trend: number;
  totalSignals: number;
  battleCount: number;
};

export async function computeSignal(subjectId: string): Promise<SignalResult> {
  const battles = await db.battle.findMany({
    where: { OR: [{ subjectAId: subjectId }, { subjectBId: subjectId }] },
    select: { id: true },
  });

  const battleIds = battles.map((b) => b.id);
  const battleCount = battleIds.length;

  if (battleCount === 0) {
    return { score: 0, confidence: 0, trend: 0, totalSignals: 0, battleCount: 0 };
  }

  const [wins, totalSignals] = await Promise.all([
    db.vote.count({ where: { subjectId } }),
    db.vote.count({ where: { battleId: { in: battleIds } } }),
  ]);

  if (totalSignals === 0) {
    return { score: 0, confidence: 0, trend: 0, totalSignals: 0, battleCount };
  }

  const score = Math.round((wins / totalSignals) * 100);
  const confidence = Math.min(100, Math.round((Math.log(totalSignals + 1) / Math.log(1001)) * 100));

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [recentWins, recentTotal] = await Promise.all([
    db.vote.count({ where: { subjectId, createdAt: { gte: sevenDaysAgo } } }),
    db.vote.count({ where: { battleId: { in: battleIds }, createdAt: { gte: sevenDaysAgo } } }),
  ]);

  const trend =
    recentTotal >= 5
      ? Math.round((recentWins / recentTotal - wins / totalSignals) * 100)
      : 0;

  return { score, confidence, trend, totalSignals, battleCount };
}

export async function refreshSnapshot(subjectId: string): Promise<void> {
  const signal = await computeSignal(subjectId);
  await db.signalSnapshot.upsert({
    where: { subjectId },
    create: { subjectId, ...signal },
    update: signal,
  });
}

export async function getSnapshot(subjectId: string): Promise<SignalResult | null> {
  const snap = await db.signalSnapshot.findUnique({ where: { subjectId } });
  if (!snap) return null;
  return {
    score: snap.score,
    confidence: snap.confidence,
    trend: snap.trend,
    totalSignals: snap.totalSignals,
    battleCount: snap.battleCount,
  };
}

export type BattleVoteCounts = { a: number; b: number; total: number };

export async function getBattleVoteCounts(battleId: string, subjectAId: string, subjectBId: string): Promise<BattleVoteCounts> {
  const [a, b] = await Promise.all([
    db.vote.count({ where: { battleId, subjectId: subjectAId } }),
    db.vote.count({ where: { battleId, subjectId: subjectBId } }),
  ]);
  return { a, b, total: a + b };
}
