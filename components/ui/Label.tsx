import type { ReactNode } from "react";

type Tone = "muted" | "accent" | "light";

const tones: Record<Tone, string> = {
  muted: "text-muted",
  accent: "text-accent",
  light: "text-white/60",
};

/**
 * Micro-label — the eyebrow above a heading, a category name, a "Recommended"
 * marker. Replaces the filled pill badges the old design used: at this size the
 * letter-spacing and the colour are enough to mark it as a label, and nothing
 * competes with the heading underneath.
 */
export function Label({
  tone = "muted",
  as: Tag = "p",
  className,
  children,
}: {
  tone?: Tone;
  as?: "p" | "span" | "h2" | "div";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={["type-label", tones[tone], className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
