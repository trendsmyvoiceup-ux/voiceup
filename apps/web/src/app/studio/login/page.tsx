"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function StudioLogin() {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token.trim()) return;
    document.cookie = `studio-token=${encodeURIComponent(token)}; path=/; max-age=86400; SameSite=Strict`;
    // Re-navigate — middleware will validate the cookie
    router.push("/studio");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[oklch(0.07_0.004_270)]">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8"
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
          Human Signal · Studio
        </p>
        <h1 className="text-lg font-bold text-white">Access required</h1>
        <input
          type="password"
          value={token}
          onChange={e => { setToken(e.target.value); setError(false); }}
          placeholder="Studio secret"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-white/20 focus:outline-none"
          autoFocus
        />
        {error && <p className="text-xs text-rose-400/80">Invalid secret.</p>}
        <button
          type="submit"
          className="rounded-xl border border-white/10 bg-white/8 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/12 active:scale-95"
        >
          Enter Studio
        </button>
      </form>
    </main>
  );
}
