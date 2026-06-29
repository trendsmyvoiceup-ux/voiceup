import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategoryIndexPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:underline">
        ← Battle
      </Link>

      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="rounded-2xl border bg-muted/40 p-5 text-center font-medium transition-colors hover:bg-muted"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
