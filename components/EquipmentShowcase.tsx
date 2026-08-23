import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryShowcase, equipment } from "@/lib/equipment";

/**
 * The four categories and what is in them.
 *
 * The old version was a bento grid of four photo tiles with the contents hidden
 * behind hover, so the section showed four dark rectangles and told you
 * nothing. Here the lists are the content, one photo supports them, and the
 * section reads at a glance.
 */
export function EquipmentShowcase() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          label="Equipment"
          title="What’s on the floor"
          intro="The same kit at every location, from the cardio row through to the sauna."
          action={
            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent"
            >
              All {equipment.length} machines and areas
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          }
        />

        <div className="mt-14 grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="relative aspect-16/9 overflow-hidden rounded-[2px] bg-sand lg:aspect-3/4">
              <Image
                src="/images/strength.jpg"
                alt="Dumbbell racks and benches on the strength floor"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {categoryShowcase.map((entry, index) => (
              <section key={entry.category} className="border-t border-line pt-5">
                <div className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="type-label nums text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-h3">{entry.category}</h3>
                </div>

                <ul className="mt-4">
                  {entry.highlights.map((item) => (
                    <li
                      key={item}
                      className="border-b border-line-soft py-2.5 text-[0.9375rem] text-body last:border-b-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
