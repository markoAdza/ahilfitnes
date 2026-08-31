import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant =
  | "primary"
  | "neutral"
  | "outline"
  | "outlineLight"
  | "onLight"
  | "outlineOnLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] font-medium whitespace-nowrap transition-colors duration-150";

/*
 * `primary` je baker: vsak poziv k akciji na tej strani je klic, in ta en gumb
 * je edino mesto, kjer akcent nastopi kot polnilo. `neutral` je kreda na
 * temnem za drugotna dejanja, `onLight` para pa obrne vlogi za svetel otok
 * (cenik), kjer bi kreda na kredi izginila.
 */
const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-accent-deep",
  neutral: "bg-chalk text-ink hover:bg-white",
  outline: "border border-line text-chalk hover:border-chalk hover:bg-ink-3",
  outlineLight:
    "border border-white/45 text-white backdrop-blur-[2px] hover:border-white hover:bg-white/10",
  onLight: "bg-ink text-chalk hover:bg-ink-2",
  outlineOnLight:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-chalk",
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
 * Uporabi next/link za notranje poti in navaden anchor za `tel:` / zunanje
 * cilje. Vsak poziv k akciji na tej strani je telefonski klic, zato se večina
 * primerkov izriše kot anchor.
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

/** Isti videz kot ButtonLink, a za dejanja, ki niso navigacija. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  return (
    <button
      className={[base, variants[variant], sizes[size], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
