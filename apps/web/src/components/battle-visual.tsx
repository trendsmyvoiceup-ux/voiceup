import type { Subject, VisualTheme } from "@/lib/comparisons";
import { cn } from "@/lib/utils";

/**
 * Renders the visual identity for one side of a battle.
 *
 * This is deliberately decoupled from voting logic (see ComparisonVoter) so
 * that a real image can be dropped in later without touching vote handling.
 *
 * Future integration point: a MediaProvider (Wikimedia Commons, Openverse,
 * AI-generated artwork, or internal uploads) would resolve `subject.mediaLabel`
 * to an actual image URL and render it here instead of the placeholder
 * monogram below. The props/contract of this component should not need to
 * change for that — only its internals.
 */

const THEME_RING: Record<VisualTheme, string> = {
  tech: "ring-sky-400/40",
  lifestyle: "ring-amber-400/40",
  entertainment: "ring-violet-400/40",
  food: "ring-emerald-400/40",
};

export function BattleVisual({
  subject,
  theme,
}: {
  subject: Subject;
  theme: VisualTheme;
}) {
  const initial = subject.mediaLabel.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Placeholder visual: an abstract monogram badge. A future
          MediaProvider replaces this <div> with an <img>/<Image>, keeping
          the same size/position so layout doesn't shift. */}
      <div
        className={cn(
          "flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/5 text-3xl font-black backdrop-blur-sm ring-4 sm:h-28 sm:w-28 sm:text-4xl",
          THEME_RING[theme]
        )}
      >
        {initial}
      </div>
      <span className="text-[11px] font-medium uppercase tracking-widest text-white/40">
        {subject.mediaHint}
      </span>
    </div>
  );
}
