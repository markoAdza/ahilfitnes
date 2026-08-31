import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryShowcase, equipment } from "@/lib/equipment";
import { forms, plural } from "@/lib/i18n";

/**
 * Štiri kategorije in kaj je v njih.
 *
 * Prvotni osnutek je tu imel bento mrežo štirih fotografij, kjer je bila
 * vsebina skrita za hover — sekcija je pokazala štiri temne pravokotnike in
 * povedala nič. Tu so seznami vsebina, fotografija jih podpira, in vsaka
 * kartica vodi naravnost v svojo kategorijo v katalogu.
 */
export function EquipmentShowcase() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          index={2}
          label="Oprema"
          title="Kaj je na tleh"
          intro="Enaka oprema na vsaki lokaciji, od vrste tekalnih stez do savne."
          action={
            <Link
              href="/oprema"
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-chalk transition-colors hover:text-accent"
            >
              Vseh {equipment.length} {plural(equipment.length, forms.naprava)}
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          }
        />

        <ul className="mt-12 grid gap-4 md:gap-5 lg:grid-cols-2">
          {categoryShowcase.map((entry, index) => (
            <li
              key={entry.slug}
              data-reveal
              data-reveal-delay={String((index % 2) + 1)}
            >
              <Link
                href={`/oprema#${entry.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[2px] border border-line bg-ink-2 transition-colors hover:border-muted"
              >
                <div className="relative aspect-16/9 overflow-hidden bg-ink-3">
                  <Image
                    src={entry.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    style={{ objectPosition: entry.focus }}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/20 to-transparent"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="type-label nums text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="type-h3">{entry.category}</h3>
                  </div>

                  <ul className="mt-4 flex-1">
                    {entry.highlights.map((item) => (
                      <li
                        key={item}
                        className="border-b border-line-soft py-2.5 text-[0.9375rem] text-body last:border-b-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 flex items-center gap-2 text-accent">
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
