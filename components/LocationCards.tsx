import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { locations, telHref } from "@/lib/site";

export function LocationCards() {
  return (
    <section id="locations" className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          title="Three Locations, One Mission"
          subtitle="All our facilities are open 24/7, giving you the freedom to train on your schedule"
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <li key={location.slug}>
              <article className="on-dark reveal-host group relative isolate flex aspect-[3/4.2] flex-col justify-end overflow-hidden rounded-3xl">
                <Image
                  src={location.image}
                  alt={`The training floor at Ahil Fitness ${location.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={{ objectPosition: location.focus }}
                  className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">{location.name}</h3>

                  <div className="mt-3">
                    <Badge tone="lime" className="text-[0.6875rem] tracking-widest">
                      <ClockIcon className="size-3.5" />
                      24/7 ACCESS
                    </Badge>
                  </div>

                  {/*
                   * `reveal` is visible by default and only collapses on devices
                   * that genuinely support hover, so addresses are never hidden
                   * on touch screens or from crawlers.
                   */}
                  <div className="reveal">
                    <div className="pt-4">
                      <p className="flex items-start gap-2 text-sm text-white/90">
                        <PinIcon className="mt-0.5 size-4 shrink-0 text-lime" />
                        {location.address}
                      </p>

                      <a
                        href={telHref(location.phone)}
                        className="mt-2 flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-lime"
                      >
                        <PhoneIcon className="size-4 shrink-0 text-lime" />
                        {location.phone}
                      </a>

                      <ul className="mt-4 flex flex-wrap gap-2">
                        {location.amenities.map((amenity) => (
                          <li key={amenity}>
                            <Badge tone="glass" className="px-2.5 py-1 font-medium">
                              {amenity}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
