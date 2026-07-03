import type { Subject, VisualTheme } from "@/lib/comparisons";
import { cn } from "@/lib/utils";

const THEME_COLORS: Record<VisualTheme, { ring: string; glow: string }> = {
  tech: { ring: "ring-sky-400/30", glow: "shadow-sky-500/20" },
  lifestyle: { ring: "ring-amber-400/30", glow: "shadow-amber-500/20" },
  entertainment: { ring: "ring-violet-400/30", glow: "shadow-violet-500/20" },
  food: { ring: "ring-emerald-400/30", glow: "shadow-emerald-500/20" },
};

export function BattleVisual({
  subject,
  theme,
}: {
  subject: Subject;
  theme: VisualTheme;
}) {
  const initial = subject.mediaLabel.charAt(0).toUpperCase();
  const colors = THEME_COLORS[theme];

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        className={cn(
          "flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/6 text-3xl font-black tracking-tight backdrop-blur-sm ring-4 transition-transform duration-500 group-hover:scale-105 sm:h-24 sm:w-24 sm:text-4xl",
          colors.ring,
          "shadow-xl",
          colors.glow
        )}
      >
        {initial}
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
        {subject.mediaHint}
      </span>
    </div>
  );
}
