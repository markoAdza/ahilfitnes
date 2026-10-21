import { PassCard } from "@/components/PassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eur } from "@/lib/i18n";
import { annualFee, passes, type Pass } from "@/lib/pricing";

const groups: { title: string; kind: Pass["kind"] }[] = [
  { title: "Časovne karte", kind: "cas" },
  { title: "Karte za obiske", kind: "obisk" },
];

/**
 * Vse karte na /cenik, ločene na časovne in na obiske — tako kot jih ljudje
 * izbirajo: "koliko časa" ali "kolikokrat". Vrstni red znotraj skupine je
 * vrstni red v lib/pricing.ts.
 */
export function PassGrid() {
  return (
    <section id="karte" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          index={1}
          label="Karte"
          title="Vadba v fitnesu 24/7"
          intro={`Vsaka karta velja na vseh lokacijah. K časovnim kartam se plača še letna članarina, ${eur(
            annualFee,
          )}; karte za obiske je nimajo.`}
        />

        {groups.map((group) => (
          <div key={group.kind} className="mt-14">
            <h3 className="type-label text-muted">{group.title}</h3>
            <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {passes
                .filter((entry) => entry.kind === group.kind)
                .map((entry, index) => (
                  <li key={entry.slug} data-reveal data-reveal-delay={String((index % 3) + 1)}>
                    <PassCard entry={entry} />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
