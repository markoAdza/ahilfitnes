import type { ReactNode } from "react";

type Tone = "lime" | "coral" | "glass";

const tones: Record<Tone, string> = {
  lime: "bg-lime text-ink",
  coral: "bg-coral text-white",
  glass: "bg-white/10 text-white/90 ring-1 ring-white/15",
};

export function Badge({
  tone = "lime",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
