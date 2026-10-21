"use client";

import Image from "next/image";

import { JoinButton } from "@/components/JoinButton";
import { MapPanel } from "@/components/MapPanel";
import { useSnapCarousel } from "@/components/motion/useSnapCarousel";
import { ButtonLink } from "@/components/ui/Button";
import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { locations, mapsHref, site, telHref } from "@/lib/site";

const arrowClass =
  "inline-flex size-11 items-center justify-center rounded-[2px] border border-line text-chalk transition-colors hover:border-accent hover:text-accent-bright disabled:pointer-events-none disabled:opacity-35";

/**
 * Preklopnik lokacij.
 *
 * Zavestno NI vzorec tablist/tabpanel: ta bi pomenil, da sta dve od treh
 * lokacij skriti, in brez JavaScripta bi ostali skriti. Tu so vse tri vedno v
 * dokumentu in vidne — nosilec je vodoravna vrsta z zaskokom, ki jo je mogoče
 * povleči s prstom, gumbi zgoraj pa so le krmilje, ki do nje zadrsa.
 *
 * Fotografije so nadomestne in niso posnete na teh lokacijah — opis slike to
 * pove, da bralnik zaslona ne dobi napačne trditve.
 */
export function LocationSwitcher() {
  const { trackRef, controlsRef, active, scrollTo, onControlKeyDown } =
    useSnapCarousel(locations.length);

  return (
    <section id="lokacije" className="relative py-20 md:py-24">
      <div className="container-page">
        <SectionHeading
          index={1}
          label="Lokacije"
          title="Tri lokacije, ena karta"
          intro="Vsaka karta odpre vse fitnese, ob vsaki uri in brez doplačila."
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTo(active - 1)}
                disabled={active === 0}
                aria-label="Prejšnja lokacija"
                className={arrowClass}
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo(active + 1)}
                disabled={active === locations.length - 1}
                aria-label="Naslednja lokacija"
                className={arrowClass}
              >
                <ChevronRightIcon className="size-5" />
              </button>
            </div>
          }
        />

        {/* Krmilje */}
        <div className="mt-10 border-b border-line" data-reveal>
          <ul ref={controlsRef} className="snap-row -mb-px flex gap-0 overflow-x-auto">
            {locations.map((location, index) => (
              <li key={location.slug} className="snap-item shrink-0">
                <button
                  type="button"
                  onClick={() => scrollTo(index)}
                  onKeyDown={(event) => onControlKeyDown(event, index)}
                  aria-current={active === index ? "true" : undefined}
                  className={[
                    "flex items-baseline gap-2.5 border-b-2 px-5 py-4 whitespace-nowrap transition-colors first:pl-0",
                    active === index
                      ? "border-accent-bright text-chalk"
                      : "border-transparent text-body hover:text-chalk",
                  ].join(" ")}
                >
                  <span aria-hidden="true" className="type-serif text-lg text-accent">
                    {location.numeral}
                  </span>
                  <span className="type-label">{location.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*
       * Vrsta se razteza čez cel zaslon, znotraj vsake plošče pa vsebina spet
       * stoji v žlebu strani — fotografija diha, besedilo ostane poravnano.
       */}
      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={`Lokacije, ${locations.length} skupaj`}
        className="snap-row mt-10 flex overflow-x-auto"
        data-reveal
        data-reveal-delay="1"
      >
        {locations.map((location, index) => (
          <article
            key={location.slug}
            className="snap-item w-full shrink-0"
            aria-label={`Fitnes ${location.name}`}
          >
            <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="group relative aspect-4/3 overflow-hidden rounded-[2px] bg-ink-2 lg:aspect-auto lg:h-full lg:min-h-[28rem]">
                  <Image
                    src={location.image}
                    alt="Nadomestna fotografija vadbenega prostora"
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    style={{ objectPosition: location.focus }}
                    className="object-cover opacity-80 grayscale transition-transform duration-700 group-hover:scale-[1.04]"
                    loading={index === 0 ? undefined : "lazy"}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-accent-deep opacity-25 mix-blend-color"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
                  />
                  <p className="type-label absolute bottom-5 left-5 text-chalk/80">
                    {location.region}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 lg:py-2">
                <p aria-hidden="true" className="type-serif text-5xl leading-none text-accent">
                  {location.numeral}
                </p>
                <h3 className="type-h2 mt-4">{location.name}</h3>

                <dl className="mt-8 flex flex-col gap-5 border-t border-line pt-6">
                  <div>
                    <Label as="dt">Naslov</Label>
                    <dd className="mt-1.5">
                      <a
                        href={mapsHref(location.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-start gap-1.5 text-[0.9375rem] text-body hover:text-chalk"
                      >
                        {location.address}
                        <ArrowUpRightIcon
                          aria-hidden="true"
                          className="mt-1 size-3.5 shrink-0"
                        />
                      </a>
                    </dd>
                  </div>

                  <div>
                    <Label as="dt">Dostop</Label>
                    <dd className="mt-1.5 text-[0.9375rem] text-body">{site.access}</dd>
                  </div>

                  <div>
                    <Label as="dt">Telefon</Label>
                    <dd className="mt-1.5">
                      <a
                        href={telHref(location.phone ?? site.phone)}
                        className="nums inline-flex items-center gap-2 text-[0.9375rem] text-body transition-colors hover:text-chalk"
                      >
                        <PhoneIcon aria-hidden="true" className="size-4 text-muted" />
                        {location.phone ?? site.phone}
                      </a>
                    </dd>
                  </div>
                </dl>

                <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                  {location.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-start gap-2.5 text-[0.9375rem] text-body"
                    >
                      <CheckIcon
                        aria-hidden="true"
                        className="mt-1 size-3.5 shrink-0 text-accent"
                      />
                      {amenity}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <JoinButton />
                  <ButtonLink
                    href={mapsHref(location.address)}
                    variant="outline"
                    size="lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Navodila za pot
                    <ArrowUpRightIcon aria-hidden="true" className="size-4" />
                  </ButtonLink>
                </div>
              </div>

              {/* Zemljevid čez oba stolpca — en primerek, brez podvajanja. */}
              <div className="lg:col-span-12">
                <MapPanel address={location.address} name={location.name} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
