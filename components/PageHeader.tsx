import Link from "next/link";
import type { ReactNode } from "react";

import { HelmetMark } from "@/components/ui/HelmetMark";
import { site } from "@/lib/site";

type Crumb = { label: string; href?: string };

/**
 * Glava podstrani: drobtine, naslov, uvod.
 *
 * Brez fotografije: notranje strani so hitrejše in lažje za pregled. Edini
 * okras je odmev čelade iz heroja — v barvi lasnice, odrezan čez desni rob.
 *
 * Drobtine so bile doslej samo vidne; tu dobijo še `BreadcrumbList` oznake, da
 * jih iskalnik lahko prikaže v zadetku.
 */
export function PageHeader({
  title,
  intro,
  crumbs,
  aside,
}: {
  title: string;
  intro?: string;
  crumbs: Crumb[];
  aside?: ReactNode;
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: new URL(crumb.href, site.url).toString() } : {}),
    })),
  };

  return (
    <section className="relative overflow-hidden border-b border-line bg-ink-2">
      <script
        type="application/ld+json"
        // Vsebina je statična in zapisana v klicu te komponente.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HelmetMark
        tone="current"
        className="pointer-events-none absolute -top-10 -right-24 h-[140%] w-auto text-line/70 md:right-[4vw]"
      />

      <div className="container-page relative pt-10 pb-16 md:pt-14 md:pb-24">
        <nav aria-label="Drobtine">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            {crumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="link-underline transition-colors hover:text-chalk"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-body">
                    {crumb.label}
                  </span>
                )}
                {index < crumbs.length - 1 ? (
                  /* text-line je bil na tej podlagi 1.26:1 — torej neviden, in
                     drobtine so se brale kot "Domov Cenik". */
                  <span aria-hidden="true" className="text-muted/70">
                    /
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="max-w-3xl">
            <h1 className="type-h1">{title}</h1>
            {intro ? (
              <p className="type-lede mt-6 max-w-2xl text-body">{intro}</p>
            ) : null}
          </div>

          {aside ? <div className="shrink-0 md:pb-1">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
