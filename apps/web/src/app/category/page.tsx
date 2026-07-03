import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategoryIndexPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-10 px-5 py-14">
      <Link href="/" className="text-xs font-medium uppercase tracking-[0.1em] text-white/35 transition-colors hover:text-white/65">
        ← Discover
      </Link>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">Human Signal</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Categories</h1>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group flex flex-col gap-1.5 rounded-2xl border border-white/8 bg-white/3 p-5 transition-all hover:border-white/14 hover:bg-white/6 active:scale-[0.98]"
          >
            <span className="font-semibold text-white/85 transition-colors group-hover:text-white">
              {category.title}
            </span>
            <span className="text-xs text-white/30">
              {category.subjects.length} subjects
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
