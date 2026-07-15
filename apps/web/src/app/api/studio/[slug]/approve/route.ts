import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type ApproveBody = {
  status: "approved" | "rejected" | "needs_changes";
  note?: string;
  by?: string;
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = (await req.json()) as ApproveBody;

  if (!["approved", "rejected", "needs_changes"].includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const now = new Date();
  const approvedAt = body.status === "approved" ? now : undefined;

  const approval = await db.battleApproval.upsert({
    where: { slug },
    create: {
      id: `c${Date.now().toString(36)}`,
      slug,
      status: body.status,
      note: body.note ?? null,
      approvedBy: body.status === "approved" ? (body.by ?? "founder") : null,
      approvedAt: approvedAt ?? null,
    },
    update: {
      status: body.status,
      note: body.note ?? null,
      approvedBy: body.status === "approved" ? (body.by ?? "founder") : null,
      approvedAt: approvedAt ?? null,
      // publishedAt / republishedAt / publishedWebsiteAt never touched here
    },
  });

  return NextResponse.json({ ok: true, approval });
}
