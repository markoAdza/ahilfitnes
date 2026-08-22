import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "lime" | "ink" | "outline" | "outlineLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors duration-200 whitespace-nowrap";

const variants: Record<Variant, string> = {
  lime: "bg-lime text-ink hover:bg-lime-dark",
  ink: "bg-ink text-white hover:bg-ink-soft",
  outline: "border-2 border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white",
  outlineLight: "border-2 border-white text-white hover:bg-white hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-[0.9375rem]",
  lg: "px-8 py-4 text-base",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/**
 * Pill link. Uses next/link for internal routes and a plain anchor for
 * `tel:` / `mailto:` / external destinations.
 */
export function ButtonLink({
  href,
  variant = "lime",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const cn = classes(variant, size, className);
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

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({
  variant = "lime",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
