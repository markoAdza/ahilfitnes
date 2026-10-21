import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/lib/equipment";

/**
 * Štiri cone in kaj je v njih.
 *
 * Vsaka kartica vodi naravnost v svojo cono v katalogu (`/oprema#kardio`).
 * Fotografije so razbarvane in toniranje v bron jih poveže z ostalo stranjo —
 * so nadomestne in ne prikazujejo fitnesov Ahil, zato so zgolj okras.
 */
export function EquipmentShowcase({ sectionIndex }: { sectionIndex?: number }) {
  return (
    <section className="py-20 md:py-24">
      <div className="container-page">
        <SectionHeading
          index={sectionIndex}
          label="Oprema"
          title="Štiri cone"
          intro="Proste uteži, naprave na plošče, kardio in prostor za funkcionalno vadbo — na vsaki lokaciji."
          action={
            <Link
              href="/oprema"
              className="type-label inline-flex items-center gap-2 text-chalk transition-colors hover:text-accent-bright"
            >
              Vsa oprema
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          }
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((entry, index) => (
            <li key={entry.slug} data-reveal data-reveal-delay={String((index % 3) + 1)}>
              <Link
                href={`/oprema#${entry.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[2px] border border-line bg-ink-2 transition-colors hover:border-accent"
              >
                <div className="relative aspect-4/5 overflow-hidden bg-ink-3">
                  <Image
                    src={entry.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                    style={{ objectPosition: entry.focus }}
                    className="object-cover opacity-75 grayscale transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-accent-deep opacity-25 mix-blend-color"
                  />
                  {/* Spodaj zlitje v kartico, zgoraj senca, da rimska številka ostane berljiva. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(18_18_17/0.7)_0%,transparent_30%,transparent_55%,var(--color-ink-2)_100%)]"
                  />
                  <span
                    aria-hidden="true"
                    className="type-serif absolute top-4 left-5 text-3xl text-accent-bright"
                  >
                    {entry.numeral}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="type-h3 text-[1.375rem] uppercase [font-stretch:72%]">
                    {entry.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] text-body">
                    {entry.description}
                  </p>

                  <p className="mt-6 flex items-center gap-2 text-accent">
                    <span className="type-label">Podrobno</span>
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
