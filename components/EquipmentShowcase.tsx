import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryShowcase } from "@/lib/equipment";

/**
 * Bento grid of the four equipment categories. Widths alternate 1/2 then 1/2
 * across a 3-column track, matching the reference layout:
 *
 *   [ Cardio  1 ][ Strength    2 ]
 *   [ Functional 1 ][ Recovery  2 ]
 */
const spans = ["lg:col-span-1", "lg:col-span-2", "lg:col-span-1", "lg:col-span-2"];

export function EquipmentShowcase() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          align="left"
          uppercase
          title={
            <>
              State-of-the-Art Equipment{" "}
              <span aria-hidden="true" className="align-middle">
                &#128170;
              </span>
            </>
          }
          subtitle="Explore our comprehensive range of professional fitness equipment"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryShowcase.map((entry, index) => (
            <article
              key={entry.category}
              className={[
                "on-dark reveal-host group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl",
                spans[index],
              ].join(" ")}
            >
              <Image
                src={entry.image}
                alt={`${entry.category} area at Ahil Fitness`}
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                style={{ objectPosition: entry.focus }}
                className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/20"
              />

              <div className="p-7">
                <h3 className="text-2xl font-bold text-white md:text-3xl">
                  {entry.category}
                </h3>

                <div className="reveal">
                  <div className="pt-4">
                    <ul className="flex flex-col gap-2">
                      {entry.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm font-medium text-white/90"
                        >
                          <CheckIcon className="size-4 shrink-0 text-lime" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/equipment"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-lime transition-colors hover:text-white"
                    >
                      View All Equipment
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
