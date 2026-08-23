import { fromPrice } from "@/lib/pricing";
import { locations } from "@/lib/site";

/**
 * The four things people actually want to know, immediately under the hero.
 *
 * This replaces the "Professional equipment • Expert trainers • 3 convenient
 * locations" line the hero used to carry — the same space, spent on real
 * information instead of adjectives. The price and the location list are read
 * from the data files, so they cannot drift from the pricing page.
 */
const facts: { term: string; detail: string }[] = [
  { term: "Open 24 hours", detail: "Every day of the year, at all three gyms" },
  {
    term: `${locations.length} locations`,
    detail: locations.map((location) => location.name).join(", "),
  },
  { term: `From €${fromPrice} a month`, detail: "On the 12-month membership" },
  { term: "No joining fee", detail: "And the monthly plan cancels any time" },
];

export function FactsBand() {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-page">
        <dl className="grid divide-y divide-line-soft sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.term}
              className="py-7 sm:py-9 sm:pr-8 lg:border-l lg:border-line-soft lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="type-h3 text-ink">{fact.term}</dt>
              <dd className="mt-1.5 text-[0.9375rem] text-muted">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
