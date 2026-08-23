import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "outlineLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] font-medium whitespace-nowrap transition-colors duration-150";

/*
 * Ink is the primary action, not the accent — the accent stays reserved for
 * small signals so it never turns into decoration. `light` / `outlineLight`
 * are the same two roles inverted for dark grounds.
 */
const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink-soft",
  secondary:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-sand-deep",
  outlineLight: "border border-white/55 text-white hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-[0.875rem]",
  lg: "px-6 py-3.5 text-[0.9375rem]",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/**
 * Uses next/link for internal routes and a plain anchor for `tel:` / `mailto:`
 * / external destinations. Every call to action on this site is a phone call,
 * so most instances render as an anchor.
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const cn = [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={cn} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={cn} {...rest}>
      {children}
    </a>
  );
}
