"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { CheckIcon, ChevronDownIcon, SearchIcon } from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import {
  categories,
  categoryShowcase,
  equipment,
  type CategorySlug,
} from "@/lib/equipment";
import { fold, forms, plural } from "@/lib/i18n";

type Filter = CategorySlug | "vse";

/** Ime kategorije → slug, da se filter ujema s kotvami v naslovu. */
const slugByName = new Map(categories.map((entry) => [entry.name, entry.slug]));

const validFilters = new Set<string>(["vse", ...categories.map((c) => c.slug)]);

/**
 * Celoten katalog s filtrom in iskanjem.
 *
 * Vseh 16 naprav izriše strežnik; filter jih le skriva, zato je brez
 * JavaScripta celoten katalog viden in indeksiran. Specifikacije stojijo v
 * domačem `<details>`: preklop, tipkovnica in semantika so vgrajeni v brskalnik,
 * iskanje po strani (Ctrl+F) pa jih zna razpreti samo — kar je vse več, kot bi
 * dal ročno sestavljen preklop na `useState`.
 *
 * Izbrana kategorija se zapiše v naslov (`/oprema#moc`), da je povezljiva —
 * kartice na domači strani se naslanjajo prav na to.
 */
export function EquipmentExplorer() {
  const [filter, setFilter] = useState<Filter>("vse");
  const [query, setQuery] = useState("");

  // Kotva iz naslova prevzame filter — ob prihodu in ob menjavi kotve.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (validFilters.has(hash)) setFilter(hash as Filter);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const select = (next: Filter) => {
    setFilter(next);
    // replaceState, da gumb "nazaj" ne postane zgodovina klikanja po filtru.
    const base = window.location.pathname + window.location.search;
    window.history.replaceState(null, "", next === "vse" ? base : `${base}#${next}`);
  };

  const needle = fold(query.trim());

  const visible = useMemo(() => {
    return equipment.filter((item) => {
      if (filter !== "vse" && slugByName.get(item.category) !== filter) return false;
      if (!needle) return true;

      return (
        fold(item.name).includes(needle) ||
        fold(item.blurb).includes(needle) ||
        fold(item.category).includes(needle) ||
        item.specs.some((spec) => fold(spec).includes(needle))
      );
    });
  }, [filter, needle]);

  const visibleSlugs = new Set(visible.map((item) => item.slug));
  const banner = categoryShowcase.find((entry) => entry.slug === filter);

  return (
    <>
      {/* Filter ostane dosegljiv, ko se seznam prebira. */}
      <div className="sticky top-16 z-30 border-b border-line bg-ink/95 backdrop-blur-md">
        <div className="container-page flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center gap-4">
            <Label className="hidden shrink-0 lg:block">Kategorija</Label>

            {/*
             * Skupina gumbov, ne seznam: `role="group"` na <ul> bi odvzel
             * semantiko seznama, <li> pa brez seznama ni veljaven.
             */}
            <div
              role="group"
              aria-label="Filtriraj po kategoriji"
              className="snap-row flex gap-2 overflow-x-auto"
            >
              {[{ name: "Vse", slug: "vse" as const }, ...categories].map((entry) => (
                <button
                  key={entry.slug}
                  type="button"
                  onClick={() => select(entry.slug)}
                  aria-pressed={filter === entry.slug}
                  className={[
                    "snap-item shrink-0 rounded-[2px] border px-3.5 py-2 text-[0.875rem] whitespace-nowrap transition-colors",
                    filter === entry.slug
                      ? "border-accent bg-accent font-medium text-ink"
                      : "border-line text-body hover:border-muted hover:text-chalk",
                  ].join(" ")}
                >
                  {entry.name}
                </button>
              ))}
            </div>
          </div>

          <div className="relative lg:w-72 lg:shrink-0">
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Išči napravo ali specifikacijo"
              aria-label="Išči po opremi"
              className="w-full rounded-[2px] border border-line bg-ink-2 py-2 pr-3 pl-9 text-[0.9375rem] text-chalk placeholder:text-muted focus:border-muted focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Fotografija izbrane kategorije — filter tako tudi vidno nekaj naredi. */}
      {banner ? (
        <div className="container-page pt-10">
          <div className="relative aspect-16/9 overflow-hidden rounded-[2px] bg-ink-2 md:aspect-[21/7]">
            <Image
              src={banner.image}
              alt=""
              fill
              sizes="100vw"
              style={{ objectPosition: banner.focus }}
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <h2 className="type-h2 text-chalk">{banner.category}</h2>
            </div>
          </div>
        </div>
      ) : null}

      <div className="container-page py-10 md:py-14">
        <p aria-live="polite" className="text-sm text-muted">
          {visible.length === equipment.length
            ? `Vseh ${equipment.length} ${plural(equipment.length, forms.naprava)} in prostorov, na vsaki lokaciji.`
            : `${visible.length} ${plural(visible.length, forms.zadetek)} od ${equipment.length}.`}
        </p>

        {visible.length === 0 ? (
          <div className="mt-10 rounded-[2px] border border-line bg-ink-2 p-8">
            <p className="type-h3">Za to iskanje ni zadetka.</p>
            <p className="mt-2 text-[0.9375rem] text-body">
              Poskusi z drugo besedo ali izberi kategorijo. Če iščeš napravo, ki je
              tu ni, pokliči in povprašaj — nekaj je morda na poti.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                select("vse");
              }}
              className="mt-5 text-[0.9375rem] font-medium text-accent underline underline-offset-4"
            >
              Počisti iskanje
            </button>
          </div>
        ) : null}

        <ul className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
          {equipment.map((item) => (
            <li key={item.slug} hidden={!visibleSlugs.has(item.slug)}>
              <details className="group h-full rounded-[2px] border border-line bg-ink-2 transition-colors open:border-muted">
                <summary className="flex cursor-pointer items-start justify-between gap-5 p-6 [&::-webkit-details-marker]:hidden">
                  <div>
                    <Label tone="accent">{item.category}</Label>
                    <h3 className="type-h3 mt-2">{item.name}</h3>
                    <p className="mt-1.5 text-[0.9375rem] text-body">{item.blurb}</p>
                  </div>

                  <ChevronDownIcon
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-muted transition-transform duration-200 group-open:-rotate-180"
                  />
                </summary>

                <div className="border-t border-line-soft px-6 py-5">
                  <ul className="grid gap-2.5">
                    {item.specs.map((spec) => (
                      <li key={spec} className="flex gap-2.5 text-sm text-muted">
                        <CheckIcon
                          aria-hidden="true"
                          className="mt-0.5 size-3.5 shrink-0 text-accent/70"
                        />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
