"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/Label";
import { categories } from "@/lib/equipment";

const validFilters = new Set<string>(["vse", ...categories.map((entry) => entry.slug)]);

/**
 * Oprema po conah, s filtrom.
 *
 * Vse štiri cone izriše strežnik; filter jih le skriva, zato je brez
 * JavaScripta cel seznam viden in indeksiran. Izbrana cona se zapiše v naslov
 * (`/oprema#kardio`), da je povezljiva — kartice na domači strani se naslanjajo
 * prav na to. Vsaka cona ima tudi svoj `id`, zato kotva brez JS vsaj zadrsa do
 * nje.
 *
 * Seznami naprav so nadomestni (glej lib/equipment.ts), zato brez števil in
 * specifikacij — samo imena, ki jih bo stranka potrdila ali zamenjala.
 */
export function EquipmentExplorer() {
  const [filter, setFilter] = useState("vse");

  // Kotva iz naslova prevzame filter — ob prihodu in ob menjavi kotve.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (validFilters.has(hash)) setFilter(hash);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const select = (next: string) => {
    setFilter(next);
    // replaceState, da gumb "nazaj" ne postane zgodovina klikanja po filtru.
    const base = window.location.pathname + window.location.search;
    window.history.replaceState(null, "", next === "vse" ? base : `${base}#${next}`);
  };

  return (
    <>
      {/* Filter ostane dosegljiv, ko se seznam prebira. */}
      <div className="sticky top-16 z-30 border-b border-line bg-ink/95 backdrop-blur-md">
        <div className="container-page flex items-center gap-4 py-3">
          <Label className="hidden shrink-0 lg:block">Cona</Label>

          {/*
           * Skupina gumbov, ne seznam: `role="group"` na <ul> bi odvzel
           * semantiko seznama, <li> pa brez seznama ni veljaven.
           */}
          <div
            role="group"
            aria-label="Filtriraj po coni"
            className="snap-row flex gap-2 overflow-x-auto"
          >
            {[{ name: "Vse", slug: "vse" }, ...categories].map((entry) => (
              <button
                key={entry.slug}
                type="button"
                onClick={() => select(entry.slug)}
                aria-pressed={filter === entry.slug}
                className={[
                  "type-label snap-item min-h-11 shrink-0 rounded-[2px] border px-4 whitespace-nowrap transition-colors",
                  filter === entry.slug
                    ? "border-accent-bright bg-accent-bright text-ink"
                    : "border-line text-body hover:border-accent hover:text-chalk",
                ].join(" ")}
              >
                {entry.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page flex flex-col gap-16 py-14 md:gap-24 md:py-20">
        {categories.map((entry) => (
          <section
            key={entry.slug}
            id={entry.slug}
            aria-labelledby={`${entry.slug}-title`}
            hidden={filter !== "vse" && filter !== entry.slug}
            className="grid gap-8 lg:grid-cols-12 lg:gap-12"
          >
            <div className="lg:col-span-7">
              <div className="relative aspect-16/10 overflow-hidden rounded-[2px] bg-ink-2">
                <Image
                  src={entry.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  style={{ objectPosition: entry.focus }}
                  className="object-cover opacity-80 grayscale"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-accent-deep opacity-25 mix-blend-color"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-2">
              <p aria-hidden="true" className="type-serif text-5xl leading-none text-accent">
                {entry.numeral}
              </p>
              <h2 id={`${entry.slug}-title`} className="type-h2 mt-4">
                {entry.name}
              </h2>
              <p className="type-lede mt-5 text-body">{entry.description}</p>

              <ul className="mt-8 border-t border-line">
                {entry.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-4 border-b border-line-soft py-4 text-[0.9375rem] text-chalk"
                  >
                    <span aria-hidden="true" className="size-1.5 shrink-0 bg-accent" />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
