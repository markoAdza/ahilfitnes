import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

/**
 * Page header: breadcrumb, title, standfirst.
 *
 * Replaces the old full-width banner — a darkened stock photo with a centred
 * uppercase headline over it. Photography on this site now only appears where
 * it carries information (the gyms themselves, the equipment categories),
 * which leaves the interior pages faster and easier to scan.
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
  return (
    <section className="border-b border-line bg-white">
      <div className="container-page pt-8 pb-12 md:pt-12 md:pb-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            {crumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="link-underline transition-colors hover:text-ink"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-body">
                    {crumb.label}
                  </span>
                )}
                {index < crumbs.length - 1 ? (
                  <span aria-hidden="true" className="text-line">
                    /
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="max-w-3xl">
            <h1 className="type-h1">{title}</h1>
            {intro ? <p className="type-lede mt-5 max-w-2xl text-body">{intro}</p> : null}
          </div>

          {aside ? <div className="shrink-0 md:pb-1">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
