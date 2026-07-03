-- Human Signal V1 — initial schema
-- Run with: prisma migrate deploy

CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'website',
    "trustScore" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Battle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subjectAId" TEXT NOT NULL,
    "subjectBId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "battleId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SignalSnapshot" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "trend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalSignals" INTEGER NOT NULL DEFAULT 0,
    "battleCount" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SignalSnapshot_pkey" PRIMARY KEY ("id")
);

-- Unique constraints
CREATE UNIQUE INDEX "Source_name_key" ON "Source"("name");
CREATE UNIQUE INDEX "Subject_slug_key" ON "Subject"("slug");
CREATE UNIQUE INDEX "Battle_slug_key" ON "Battle"("slug");
CREATE UNIQUE INDEX "Vote_battleId_anonymousId_key" ON "Vote"("battleId", "anonymousId");
CREATE UNIQUE INDEX "SignalSnapshot_subjectId_key" ON "SignalSnapshot"("subjectId");

-- Performance indexes
CREATE INDEX "Vote_subjectId_idx" ON "Vote"("subjectId");
CREATE INDEX "Vote_battleId_idx" ON "Vote"("battleId");
CREATE INDEX "Vote_createdAt_idx" ON "Vote"("createdAt");

-- Foreign keys
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_subjectAId_fkey"
    FOREIGN KEY ("subjectAId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Battle" ADD CONSTRAINT "Battle_subjectBId_fkey"
    FOREIGN KEY ("subjectBId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Vote" ADD CONSTRAINT "Vote_battleId_fkey"
    FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Vote" ADD CONSTRAINT "Vote_subjectId_fkey"
    FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Vote" ADD CONSTRAINT "Vote_sourceId_fkey"
    FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "SignalSnapshot" ADD CONSTRAINT "SignalSnapshot_subjectId_fkey"
    FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
