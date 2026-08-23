import Image from "next/image";

import { ArrowUpRightIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { locations, mapsHref, telHref } from "@/lib/site";

/** "Free parking, locker rooms, showers, sauna" — sentence case, comma list. */
function amenityList(items: string[]): string {
  return items
    .map((item, index) =>
      index === 0 ? item : item.charAt(0).toLowerCase() + item.slice(1),
    )
    .join(", ");
}

export function Locations() {
  return (
    <section id="locations" className="bg-sand py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          label="Locations"
          title="Three gyms, one membership"
          intro="Your card opens all three at any hour, at no extra cost. Train near home in the week and near work on the way back."
        />

        {/*
         * Addresses and phone numbers are on the page at all times. The old
         * cards kept them behind a hover state, which hid the single most
         * useful thing on the section from anyone on a touch screen.
         */}
        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <li key={location.slug}>
              <article>
                <div className="relative aspect-4/3 overflow-hidden rounded-[2px] bg-sand-deep">
                  <Image
                    src={location.image}
                    alt={`The training floor at Ahil Fitness ${location.name}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    style={{ objectPosition: location.focus }}
                    className="object-cover"
                  />
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                  <h3 className="type-h3">{location.name}</h3>
                  <Label>{location.region}</Label>
                </div>

                <dl className="mt-5 flex flex-col gap-3 text-[0.9375rem]">
                  <div className="flex gap-3">
                    <dt className="sr-only">Address</dt>
                    <PinIcon
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-muted"
                    />
                    <dd className="text-body">{location.address}</dd>
                  </div>

                  <div className="flex gap-3">
                    <dt className="sr-only">Phone</dt>
                    <PhoneIcon
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-muted"
                    />
                    <dd>
                      <a
                        href={telHref(location.phone)}
                        className="nums link-underline text-body hover:text-ink"
                      >
                        {location.phone}
                      </a>
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm text-muted">
                  {amenityList(location.amenities)}
                </p>

                <a
                  href={mapsHref(location.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  Directions
                  <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
