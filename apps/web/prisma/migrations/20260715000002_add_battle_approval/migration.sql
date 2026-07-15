-- BattleApproval: persists founder approval and publication state server-side.
-- Separate from Battle so approval can exist before the battle is live.

CREATE TABLE IF NOT EXISTS "BattleApproval" (
    "id"                 TEXT        NOT NULL,
    "slug"               TEXT        NOT NULL,
    "status"             TEXT        NOT NULL,
    "note"               TEXT,
    "approvedBy"         TEXT,
    "approvedAt"         TIMESTAMPTZ,
    "publishedBy"        TEXT,
    "publishedAt"        TIMESTAMPTZ,
    "republishedAt"      TIMESTAMPTZ,
    "publishedWebsiteAt" TIMESTAMPTZ,
    "createdAt"          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt"          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT "BattleApproval_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "BattleApproval_slug_key" ON "BattleApproval"("slug");

-- Add audit columns to existing table (idempotent via IF NOT EXISTS on columns is not standard;
-- use DO block to guard against re-runs on already-migrated DBs)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'BattleApproval' AND column_name = 'approvedBy') THEN
        ALTER TABLE "BattleApproval" ADD COLUMN "approvedBy" TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'BattleApproval' AND column_name = 'approvedAt') THEN
        ALTER TABLE "BattleApproval" ADD COLUMN "approvedAt" TIMESTAMPTZ;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'BattleApproval' AND column_name = 'publishedBy') THEN
        ALTER TABLE "BattleApproval" ADD COLUMN "publishedBy" TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'BattleApproval' AND column_name = 'publishedAt') THEN
        ALTER TABLE "BattleApproval" ADD COLUMN "publishedAt" TIMESTAMPTZ;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'BattleApproval' AND column_name = 'republishedAt') THEN
        ALTER TABLE "BattleApproval" ADD COLUMN "republishedAt" TIMESTAMPTZ;
    END IF;
END $$;
