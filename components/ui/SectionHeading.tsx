import type { ReactNode } from "react";

/**
 * Shared section header: optional eyebrow, heading and subtitle.
 *
 * `as` controls the heading level only — every section heading renders at the
 * same display size regardless, matching the reference design.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
  uppercase = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  uppercase?: boolean;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={[
        centered ? "mx-auto max-w-4xl text-center" : "max-w-5xl text-left",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold tracking-[0.2em] text-body uppercase">
          <span aria-hidden="true" className="mr-2 text-lime-ink">
            &bull;
          </span>
          {eyebrow}
        </p>
      ) : null}

      <Tag className={["text-h2", uppercase ? "uppercase" : ""].filter(Boolean).join(" ")}>
        {title}
      </Tag>

      {subtitle ? (
        <p
          className={[
            "mt-5 max-w-2xl text-lg leading-relaxed text-body md:text-xl",
            centered ? "mx-auto" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
