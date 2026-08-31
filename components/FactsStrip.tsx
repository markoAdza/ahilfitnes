import { Counter } from "@/components/motion/Counter";
import { equipment } from "@/lib/equipment";
import { forms, listSl, plural } from "@/lib/i18n";
import { fromPrice } from "@/lib/pricing";
import { locations } from "@/lib/site";

/**
 * Štiri stvari, ki jih ljudje res želijo vedeti, takoj pod heroem.
 *
 * To nadomešča vrstico "Profesionalna oprema • Izkušeni trenerji • 3 priročne
 * lokacije" iz prvotnega osnutka — isti prostor, porabljen za resnične podatke
 * namesto za pridevnike. Vsa števila so brana iz podatkovnih datotek, zato se
 * ne morejo razlikovati od cenika ali kataloga.
 */
const facts: { value: number; unit: string; detail: string }[] = [
  {
    value: 24,
    unit: "ur na dan",
    detail: "Odprto vsak dan v letu, v vseh treh fitnesih",
  },
  {
    value: locations.length,
    unit: plural(locations.length, forms.lokacija),
    detail: listSl(locations.map((location) => location.name)),
  },
  {
    value: equipment.length,
    unit: plural(equipment.length, forms.naprava),
    detail: "Enaka oprema na vsaki lokaciji, vključena v članarino",
  },
  {
    value: fromPrice,
    unit: "€ na mesec",
    detail: "Najnižja cena, pri 12-mesečni članarini",
  },
];

export function FactsStrip() {
  return (
    <section
      aria-label="Ključni podatki"
      className="border-b border-line bg-ink-2/95 backdrop-blur-md lg:sticky lg:top-16 lg:z-30"
    >
      {/*
       * Na telefonu vodoravna vrsta, ki se jo povleče s prstom in se zaskoči —
       * štiri dejstva drug pod drugim bi hero potisnila predaleč navzgor.
       * Od lg naprej mreža, ki se prilepi pod navigacijo.
       */}
      <dl className="snap-row container-page flex gap-0 overflow-x-auto lg:grid lg:grid-cols-4 lg:overflow-x-visible">
        {facts.map((fact, index) => (
          <div
            key={fact.unit + fact.value}
            className={[
              "snap-item w-[15rem] shrink-0 py-6 pr-8 lg:w-auto lg:py-7 lg:pr-6",
              index > 0 ? "lg:border-l lg:border-line-soft lg:pl-6" : "",
            ].join(" ")}
          >
            <dt className="flex items-baseline gap-2">
              <Counter
                value={fact.value}
                className="type-stat text-chalk lg:text-[2.75rem]"
              />
              <span className="text-[0.9375rem] text-accent">{fact.unit}</span>
            </dt>
            <dd className="mt-2 text-sm text-muted">{fact.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
