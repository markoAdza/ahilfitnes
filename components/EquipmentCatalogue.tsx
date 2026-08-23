import Image from "next/image";

import { CheckIcon } from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { categories, categoryShowcase, equipment } from "@/lib/equipment";

/**
 * The full catalogue, grouped by category.
 *
 * Three things changed from the filter grid this replaces. The specs are on the
 * page instead of behind sixteen "Learn More" toggles, because a spec sheet is
 * meant to be read rather than clicked through. The placeholder art — a lime
 * line icon on a dark panel with a category-tinted radial glow — is gone, and
 * each category is identified by a photograph of that part of the gym instead.
 * And the client-side filter is now a set of anchors, so every category is
 * linkable, crawlable and needs no JavaScript.
 */
export function EquipmentCatalogue() {
  return (
    <>
      <nav
        aria-label="Equipment categories"
        className="border-b border-line bg-white"
      >
        <div className="container-page flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
          <Label className="text-muted">Jump to</Label>
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase()}`}
              className="link-underline text-[0.9375rem] text-body transition-colors hover:text-ink"
            >
              {category}
            </a>
          ))}
        </div>
      </nav>

      <div className="container-page">
        {categoryShowcase.map((group) => {
          const items = equipment.filter((item) => item.category === group.category);

          return (
            <section
              key={group.category}
              id={group.category.toLowerCase()}
              className="border-t border-line py-14 first:border-t-0 md:py-20"
            >
              <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
                {/* Travels with its own list, so the column is never stranded. */}
                <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
                  <div className="relative aspect-16/9 overflow-hidden rounded-[2px] bg-sand lg:aspect-3/4">
                    <Image
                      src={group.image}
                      alt={`The ${group.category.toLowerCase()} area at Ahil Fitness`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      style={{ objectPosition: group.focus }}
                      className="object-cover"
                    />
                  </div>

                  <h2 className="type-h2 mt-6">{group.category}</h2>
                  <p className="mt-2 text-[0.9375rem] text-muted">
                    {items.length} in this category, at every location.
                  </p>
                </div>

                <ul className="lg:col-span-8">
                  {items.map((item) => (
                    <li
                      key={item.slug}
                      className="border-t border-line-soft py-7 first:border-t-0 first:pt-0 last:pb-0"
                    >
                      <h3 className="type-h3">{item.name}</h3>
                      <p className="mt-1.5 text-[0.9375rem] text-body">{item.blurb}</p>

                      <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                        {item.specs.map((spec) => (
                          <li key={spec} className="flex gap-2.5 text-sm text-muted">
                            <CheckIcon
                              aria-hidden="true"
                              className="mt-0.5 size-3.5 shrink-0 text-muted/50"
                            />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
