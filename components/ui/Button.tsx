import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "outlineLight";
type Size = "md" | "lg";

/*
 * Velike črke z razmikom in najmanj 44 px višine — gumb mora biti zadetek s
 * palcem tudi na najmanjšem telefonu.
 */
const base =
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[2px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap transition-[background-color,border-color,color,filter] duration-200";

/*
 * `primary` je poliran bron: edino mesto, kjer akcent nastopi kot polnilo, in
 * vedno vodi k vpisu. Hover ga posvetli s filtrom namesto z drugo barvo, da ne
 * vpelje odtenka, ki ga v žetonih ni. `outline` je drugotno dejanje na
 * podlagi strani, `outlineLight` isto nad fotografijo.
 */
const variants: Record<Variant, string> = {
  primary: "bg-accent-bright text-ink hover:brightness-110 active:brightness-95",
  outline: "border border-line text-chalk hover:border-accent hover:text-accent-bright",
  outlineLight:
    "border border-chalk/40 text-chalk backdrop-blur-[2px] hover:border-accent-bright hover:text-accent-bright",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-[0.75rem]",
  lg: "px-7 py-4 text-[0.8125rem]",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/**
 * Uporabi next/link za notranje poti in navaden anchor za `tel:`, `mailto:` in
 * zunanje cilje.
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
