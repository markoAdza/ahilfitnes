import { locations } from "@/lib/site";

/**
 * Kinetični trak.
 *
 * Nosi izključno dejstva — lokacije, urnik, kaj je vključeno. Nobenega slogana:
 * trak, ki se giblje, pritegne pogled, in ta pogled je predragocen, da bi ga
 * porabili za "spremeni svoje telo".
 *
 * `aria-hidden`, ker vse, kar piše, na strani že stoji v berljivi obliki.
 * Ustavi se pod `prefers-reduced-motion` (glej globals.css).
 */
const items = [
  "Odprto 24/7",
  ...locations.map((location) => location.name),
  "Ena članarina",
  "Brez vpisnine",
  "Savna vključena",
];

export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-line bg-ink-2 py-4"
    >
      <div className="marquee-track">
        {/* Dve enaki polovici; animacija premakne točno eno. */}
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={`${half}-${item}`}
                className="type-label flex items-center gap-8 px-8 text-muted"
              >
                {item}
                <span className="inline-block size-1 shrink-0 rounded-full bg-accent" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
