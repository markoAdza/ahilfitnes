/**
 * Tanka vodoravna črta med deli strani.
 *
 * Namenoma redka: pod herojem, nad nogo in kot ločnica v ceniku.
 */
export function Divider({
  tone = "bronze",
  className,
}: {
  /** `bronze` za poudarjene meje, `line` za tihe. */
  tone?: "bronze" | "line";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={[
        "h-px w-full",
        tone === "line" ? "bg-line" : "bg-accent-deep/60",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
