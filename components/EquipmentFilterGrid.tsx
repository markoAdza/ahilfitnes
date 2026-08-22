"use client";

import { useMemo, useState } from "react";

import { EquipmentIcon } from "@/components/EquipmentIcon";
import { Badge } from "@/components/ui/Badge";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { categories, equipment, type Category } from "@/lib/equipment";

type Filter = "All" | Category;

const filters: Filter[] = ["All", ...categories];

/** Per-category accent glow behind each card's icon. */
const glow: Record<Category, string> = {
  Cardio:
    "bg-[radial-gradient(circle_at_50%_45%,rgba(196,248,42,0.22),transparent_70%)]",
  Strength:
    "bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.16),transparent_70%)]",
  Functional:
    "bg-[radial-gradient(circle_at_50%_45%,rgba(238,113,104,0.22),transparent_70%)]",
  Recovery:
    "bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.22),transparent_70%)]",
};

export function EquipmentFilterGrid() {
  const [active, setActive] = useState<Filter>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const items = useMemo(
    () =>
      active === "All"
        ? equipment
        : equipment.filter((item) => item.category === active),
    [active],
  );

  return (
    <>
      {/* Filter bar */}
      <div className="border-b border-line bg-white">
        <div className="container-page py-6">
          <div
            role="group"
            aria-label="Filter equipment by category"
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {filters.map((filter) => {
              const isActive = filter === active;
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActive(filter);
                    setExpanded(null);
                  }}
                  className={[
                    "rounded-full px-5 py-2 text-[0.9375rem] font-semibold transition-colors",
                    isActive
                      ? "bg-lime text-ink"
                      : "border border-line bg-white text-ink hover:border-ink/30 hover:bg-surface",
                  ].join(" ")}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-page">
          <p className="sr-only" role="status">
            {items.length} items shown
            {active === "All" ? "" : ` in ${active}`}
          </p>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
              const isOpen = expanded === item.slug;
              return (
                <li key={item.slug}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
                    {/*
                     * Design-led panel instead of a photo: individual equipment
                     * photography was not available, so each item gets its own
                     * line-icon over an ink panel with a category-tinted glow.
                     */}
                    <div className="relative isolate grid aspect-[4/3] place-items-center overflow-hidden bg-ink">
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 -z-10 ${glow[item.category]}`}
                      />
                      <EquipmentIcon
                        name={item.icon}
                        className="size-16 text-lime/90"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div>
                        <Badge tone="lime" className="text-[0.6875rem]">
                          {item.category}
                        </Badge>
                      </div>

                      <h2 className="mt-3 text-lg font-bold">{item.name}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-body">
                        {item.blurb}
                      </p>

                      {isOpen ? (
                        <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
                          {item.specs.map((spec) => (
                            <li
                              key={spec}
                              className="flex items-start gap-2 text-sm text-body"
                            >
                              <CheckIcon className="mt-0.5 size-4 shrink-0 text-lime-ink" />
                              {spec}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.slug)}
                        className="mt-auto inline-flex items-center gap-2 self-start pt-4 text-sm font-bold text-lime-ink transition-colors hover:text-ink"
                      >
                        {isOpen ? "Show Less" : "Learn More"}
                        <ArrowRightIcon
                          aria-hidden="true"
                          className={[
                            "size-4 transition-transform",
                            isOpen ? "-rotate-90" : "",
                          ].join(" ")}
                        />
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
