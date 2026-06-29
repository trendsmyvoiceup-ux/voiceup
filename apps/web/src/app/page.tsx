import Link from "next/link";
import { getComparisonBySlug } from "@/lib/comparisons";
import { ComparisonVoter } from "@/components/comparison-voter";

// Fixed featured battle: deterministic on purpose, so the homepage is
// predictable for testing and social sharing. Not randomized.
const FEATURED_SLUG = "apple-vs-android";

export default function Home() {
  const featured = getComparisonBySlug(FEATURED_SLUG)!;

  return (
    <main className="relative flex h-screen w-screen flex-col bg-black">
      <div className="pointer-events-none absolute left-0 right-0 top-12 z-10 flex justify-center sm:top-16">
        <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-black">
          Add your Voice
        </span>
      </div>

      <div className="relative flex-1">
        <ComparisonVoter comparison={featured} />
      </div>

      <div className="flex shrink-0 items-center justify-center gap-6 bg-black py-4 text-sm">
        <Link href="/category" className="text-white/60 hover:text-white">
          Continue exploring
        </Link>
        <Link href="/battle" className="text-white/60 hover:text-white">
          More battles
        </Link>
      </div>
    </main>
  );
}
