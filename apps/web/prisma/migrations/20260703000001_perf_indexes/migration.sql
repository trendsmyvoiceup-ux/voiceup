-- Performance indexes: category lookups and battle-subject joins
-- Run with: prisma migrate deploy

CREATE INDEX "Subject_category_idx" ON "Subject"("category");
CREATE INDEX "Battle_category_idx" ON "Battle"("category");
CREATE INDEX "Battle_subjectAId_idx" ON "Battle"("subjectAId");
CREATE INDEX "Battle_subjectBId_idx" ON "Battle"("subjectBId");
