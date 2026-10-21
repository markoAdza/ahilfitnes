import { Counter } from "@/components/motion/Counter";
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
const facts: { value: number; unit: string; detail: string }[] = [
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
      {/*
       * Na telefonu vodoravna vrsta, ki se jo povleče s prstom in se zaskoči —
       * štiri dejstva drug pod drugim bi hero potisnila predaleč navzgor.
       * Od lg naprej mreža.
       */}
      <dl className="snap-row container-page flex gap-0 overflow-x-auto lg:grid lg:grid-cols-4 lg:overflow-x-visible">
        {facts.map((fact, index) => (
          <div
            key={fact.unit + fact.value}
            className={[
              "snap-item w-[14rem] shrink-0 py-7 pr-8 lg:w-auto lg:py-9 lg:pr-6",
              index > 0 ? "lg:border-l lg:border-line-soft lg:pl-8" : "",
            ].join(" ")}
          >
            <dt className="flex items-baseline gap-2.5">
              <Counter value={fact.value} className="type-stat text-chalk" />
              <span className="type-label text-accent">{fact.unit}</span>
            </dt>
            <dd className="mt-2.5 text-sm text-muted">{fact.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
