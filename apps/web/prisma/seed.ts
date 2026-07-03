/**
 * Seed script: populates the runtime database from static comparison data.
 * Run with: node prisma/seed.ts
 *
 * Idempotent — safe to run multiple times (uses upsert throughout).
 * Requires DATABASE_URL environment variable.
 */

import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.ts";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter } as never);

// Mirror of apps/web/src/lib/comparisons.ts — kept in sync manually.
const COMPARISONS = [
  {
    id: "apple-vs-android",
    subjectA: { name: "Apple", slug: "apple" },
    subjectB: { name: "Android", slug: "android" },
    category: "Technology",
    title: "Apple vs Android",
  },
  {
    id: "coffee-vs-tea",
    subjectA: { name: "Coffee", slug: "coffee" },
    subjectB: { name: "Tea", slug: "tea" },
    category: "Lifestyle",
    title: "Coffee vs Tea",
  },
  {
    id: "netflix-vs-youtube",
    subjectA: { name: "Netflix", slug: "netflix" },
    subjectB: { name: "YouTube", slug: "youtube" },
    category: "Entertainment",
    title: "Netflix vs YouTube",
  },
  {
    id: "marvel-vs-dc",
    subjectA: { name: "Marvel", slug: "marvel" },
    subjectB: { name: "DC", slug: "dc" },
    category: "Pop Culture",
    title: "Marvel vs DC",
  },
  {
    id: "pizza-vs-burger",
    subjectA: { name: "Pizza", slug: "pizza" },
    subjectB: { name: "Burger", slug: "burger" },
    category: "Food",
    title: "Pizza vs Burger",
  },
];

async function main() {
  console.log("Seeding database…");

  const source = await db.source.upsert({
    where: { name: "Website" },
    create: { name: "Website", type: "website", trustScore: 1.0 },
    update: {},
  });
  console.log(`  ✔ Source: ${source.name}`);

  for (const c of COMPARISONS) {
    const subjectA = await db.subject.upsert({
      where: { slug: c.subjectA.slug },
      create: { slug: c.subjectA.slug, name: c.subjectA.name, category: c.category },
      update: { name: c.subjectA.name, category: c.category },
    });

    const subjectB = await db.subject.upsert({
      where: { slug: c.subjectB.slug },
      create: { slug: c.subjectB.slug, name: c.subjectB.name, category: c.category },
      update: { name: c.subjectB.name, category: c.category },
    });

    await db.battle.upsert({
      where: { slug: c.id },
      create: {
        slug: c.id,
        title: c.title,
        category: c.category,
        subjectAId: subjectA.id,
        subjectBId: subjectB.id,
        status: "active",
      },
      update: { title: c.title, category: c.category },
    });

    for (const subject of [subjectA, subjectB]) {
      await db.signalSnapshot.upsert({
        where: { subjectId: subject.id },
        create: {
          subjectId: subject.id,
          score: 0,
          confidence: 0,
          trend: 0,
          totalSignals: 0,
          battleCount: 0,
        },
        update: {},
      });
    }

    console.log(`  ✔ Battle: ${c.title}`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => pool.end());
