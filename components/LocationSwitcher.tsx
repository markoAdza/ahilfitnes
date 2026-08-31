"use client";

import Image from "next/image";

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
import { locations, mapsHref, telHref } from "@/lib/site";

/**
 * Preklopnik lokacij.
 *
 * Zavestno NI vzorec tablist/tabpanel: ta bi pomenil, da sta dve od treh
 * lokacij skriti, in brez JavaScripta bi ostali skriti. Tu so vse tri vedno v
 * dokumentu in vidne — nosilec je vodoravna vrsta z zaskokom, ki jo je mogoče
 * povleči s prstom, gumbi zgoraj pa so le krmilje, ki do nje zadrsa.
 *
 * Brez JavaScripta torej dobiš delujoč karusel z domačim drsenjem; z njim
 * dobiš še gumbe, tipkovnico in ujemanje krmilja z položajem.
 */
export function LocationSwitcher() {
  const { trackRef, controlsRef, active, scrollTo, onControlKeyDown } =
    useSnapCarousel(locations.length);

  return (
    <section id="lokacije" className="relative py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          index={1}
          label="Lokacije"
          title="Trije fitnesi, ena članarina"
          intro="Tvoja kartica odpre vse tri ob vsaki uri, brez doplačila. Vadi blizu doma med tednom in blizu službe na poti nazaj."
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTo(active - 1)}
                disabled={active === 0}
                aria-label="Prejšnja lokacija"
                className="inline-flex size-11 items-center justify-center rounded-[2px] border border-line text-chalk transition-colors hover:border-chalk hover:bg-ink-3 disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo(active + 1)}
                disabled={active === locations.length - 1}
                aria-label="Naslednja lokacija"
                className="inline-flex size-11 items-center justify-center rounded-[2px] border border-line text-chalk transition-colors hover:border-chalk hover:bg-ink-3 disabled:pointer-events-none disabled:opacity-35"
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
                    "border-b-2 px-4 py-3.5 text-[0.9375rem] whitespace-nowrap transition-colors first:pl-0",
                    active === index
                      ? "border-accent font-medium text-chalk"
                      : "border-transparent text-body hover:text-chalk",
                  ].join(" ")}
                >
                  {location.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*
       * Vrsta se razteza čez cel zaslon, znotraj vsake plošče pa vsebina spet
       * stoji v žlebu strani — tako fotografija diha, besedilo pa ostane
       * poravnano z ostalo stranjo.
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
            <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <div className="relative aspect-4/3 overflow-hidden rounded-[2px] bg-ink-2 lg:aspect-16/9">
                  <Image
                    src={location.image}
                    alt={`Vadbeni prostor v fitnesu ${location.name}`}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    style={{ objectPosition: location.focus }}
                    className="object-cover"
                    loading={index === 0 ? undefined : "lazy"}
                  />
                  <p className="absolute top-4 left-4 rounded-[2px] bg-ink/80 px-3 py-1.5 text-sm text-chalk backdrop-blur-sm">
                    {location.region}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <p className="type-label nums text-muted">
                  {String(index + 1).padStart(2, "0")} / {locations.length}
                </p>
                <h3 className="type-h2 mt-3">{location.name}</h3>

                <dl className="mt-6 flex flex-col gap-4 border-t border-line pt-6">
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
                    <Label as="dt">Telefon</Label>
                    <dd className="mt-1.5">
                      <a
                        href={telHref(location.phone)}
                        className="nums inline-flex items-center gap-2 text-[0.9375rem] text-body transition-colors hover:text-chalk"
                      >
                        <PhoneIcon aria-hidden="true" className="size-4 text-muted" />
                        {location.phone}
                      </a>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 border-t border-line pt-6">
                  <Label as="h4">V tem fitnesu</Label>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
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
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={telHref(location.phone)} size="lg">
                    Pokliči {location.name}
                  </ButtonLink>
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
