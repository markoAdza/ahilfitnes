import { type Fact, FactsCarousel } from "@/components/FactsCarousel";
import { eur, forms, listSl, plural } from "@/lib/i18n";
import { fromPrice, pass } from "@/lib/pricing";
import { locations } from "@/lib/site";

/**
 * Štiri stvari, ki jih ljudje res želijo vedeti, takoj pod heroem.
 *
 * Vsa števila so brana iz podatkovnih datotek, zato se ne morejo razlikovati
 * od cenika ali seznama lokacij. Nič izmišljenega — ne števila naprav ne
 * "zadovoljnih članov".
 */
const facts: Fact[] = [
  {
    value: 24,
    unit: "ur na dan",
    detail: "Vse dni v letu, vstop s kartico",
  },
  {
    value: locations.length,
    unit: plural(locations.length, forms.lokacija),
    detail: listSl(locations.map((location) => location.name)),
  },
  {
    value: fromPrice,
    unit: "€ za obisk",
    detail: `Mesečna karta ${eur(pass("mesecna").price)}`,
  },
  {
    value: 1,
    unit: plural(1, forms.karta),
    detail: "Velja v vseh fitnesih, brez doplačila",
  },
];

export function FactsStrip() {
  return (
    <section aria-label="Ključni podatki" className="border-b border-line bg-ink">
      <FactsCarousel facts={facts} />
    </section>
  );
}
