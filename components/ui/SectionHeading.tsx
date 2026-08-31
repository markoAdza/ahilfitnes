import type { ReactNode } from "react";

import { Label } from "@/components/ui/Label";

/**
 * Deljena glava sekcije: lasnica, številka sekcije, mikro oznaka, naslov in
 * neobvezen uvod. Levo poravnana in nad njo črta — črta je kompozicijsko
 * sredstvo, ki sekcije poveže med sabo, namesto prejšnjega centriranja vsega.
 *
 * `index` izriše dvomestno številko sekcije ob oznaki. To je isti prijem, kot
 * ga uporablja mreža kategorij opreme, le da tu drži ritem celotne strani.
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
  tone = "dark",
  className,
}: {
  label?: string;
  index?: number;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
  rule?: boolean;
  tone?: "dark" | "light";
  className?: string;
}) {
  const onLight = tone === "light";

  return (
    <div
      className={[
        rule ? (onLight ? "border-t border-paper-line pt-8" : "border-t border-line pt-8") : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label || index !== undefined ? (
        <div className="mb-5 flex items-center gap-3">
          {index !== undefined ? (
            <span
              aria-hidden="true"
              className={[
                "type-label nums",
                onLight ? "text-accent-ink" : "text-accent",
              ].join(" ")}
            >
              {String(index).padStart(2, "0")}
            </span>
          ) : null}
          {label ? <Label tone={onLight ? "onLight" : "muted"}>{label}</Label> : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <div className="max-w-2xl">
          <Tag className={Tag === "h1" ? "type-h1" : "type-h2"}>{title}</Tag>

          {intro ? (
            <p
              className={[
                "type-lede mt-4",
                onLight ? "text-ink/70" : "text-body",
              ].join(" ")}
            >
              {intro}
            </p>
          ) : null}
        </div>

        {action ? <div className="shrink-0 md:pb-1">{action}</div> : null}
      </div>
    </div>
  );
}
