import type { ReactNode } from "react";

import { Label } from "@/components/ui/Label";

/**
 * Shared section header: a hairline rule, a micro-label, the heading, and an
 * optional standfirst. Left-aligned and rule-topped by default — the rule is
 * the compositional device that ties the sections together, in place of the
 * old centred-everything treatment.
 *
 * `action` renders opposite the heading on desktop (e.g. a "see all" link), so
 * a section can offer a way out without a stranded centred link underneath it.
 */
export function SectionHeading({
  label,
  title,
  intro,
  action,
  as: Tag = "h2",
  rule = true,
  className,
}: {
  label?: string;
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
      {label ? <Label className="mb-5">{label}</Label> : null}

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <div className="max-w-2xl">
          <Tag className={Tag === "h1" ? "type-h1" : "type-h2"}>{title}</Tag>

          {intro ? <p className="type-lede mt-4 text-body">{intro}</p> : null}
        </div>

        {action ? <div className="shrink-0 md:pb-1">{action}</div> : null}
      </div>
    </div>
  );
}
