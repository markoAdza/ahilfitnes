import type { ReactNode } from "react";

import { Label } from "@/components/ui/Label";

/** 1 → I, 4 → IV. Sekcij je malo, zato zadošča preprosta tabela. */
function roman(value: number): string {
  const table: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let rest = value;
  let out = "";
  for (const [amount, numeral] of table) {
    while (rest >= amount) {
      out += numeral;
      rest -= amount;
    }
  }
  return out;
}

/**
 * Deljena glava sekcije: lasnica, rimska številka sekcije, mikro oznaka,
 * naslov in neobvezen uvod. Levo poravnana in nad njo črta — črta je
 * kompozicijsko sredstvo, ki sekcije poveže med sabo.
 *
 * `index` izriše rimsko številko v bronasti serifni kurzivi. To je edini
 * klasični naglas v glavi; naslov sam ostane kondenziran in surov.
 *
 * `action` se izriše nasproti naslova na namizju (npr. povezava "vse"), da
 * sekcija ponudi izhod brez osamljene povezave pod njo.
 */
export function SectionHeading({
  label,
  index,
  title,
  intro,
  action,
  as: Tag = "h2",
  rule = true,
  className,
}: {
  label?: string;
  index?: number;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
  rule?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[rule ? "border-t border-line pt-8" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {label || index !== undefined ? (
        <div className="mb-6 flex items-baseline gap-4">
          {index !== undefined ? (
            <span
              aria-hidden="true"
              className="type-serif text-[1.75rem] leading-none text-accent"
            >
              {roman(index)}
            </span>
          ) : null}
          {label ? <Label>{label}</Label> : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <div className="max-w-2xl">
          <Tag className={Tag === "h1" ? "type-h1" : "type-h2"}>{title}</Tag>

          {intro ? <p className="type-lede mt-5 text-body">{intro}</p> : null}
        </div>

        {action ? <div className="shrink-0 md:pb-1">{action}</div> : null}
      </div>
    </div>
  );
}
