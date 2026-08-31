import type { ReactNode } from "react";

type Tone = "muted" | "accent" | "light" | "onLight";

const tones: Record<Tone, string> = {
  muted: "text-muted",
  accent: "text-accent",
  /** Nad fotografijo, kjer je podlaga negotova. */
  light: "text-white/65",
  /** Na svetlem otoku (cenik), kjer bi `muted` izginil. */
  onLight: "text-ink/55",
};

/**
 * Mikro oznaka — nadnapis nad naslovom, ime kategorije, oznaka "Priporočeno".
 * Nadomešča polnjene tablete iz prvotnega osnutka: pri tej velikosti sta razmik
 * med črkami in barva dovolj, da se bere kot oznaka, in nič ne tekmuje z
 * naslovom pod njo.
 */
export function Label({
  tone = "muted",
  as: Tag = "p",
  className,
  children,
}: {
  tone?: Tone;
  as?: "p" | "span" | "h2" | "h3" | "h4" | "div" | "dt";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={["type-label", tones[tone], className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
