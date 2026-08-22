import Image from "next/image";
import Link from "next/link";

import { ChevronRightIcon } from "@/components/ui/Icons";

type Crumb = { label: string; href?: string };

/** Full-width image banner with a heading and breadcrumb trail. */
export function PageHero({
  title,
  image,
  alt,
  crumbs,
}: {
  title: string;
  image: string;
  alt: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="on-dark relative isolate flex min-h-[18rem] items-center justify-center overflow-hidden md:min-h-[22rem]">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/55" />

      <div className="container-page py-16 text-center">
        <h1 className="text-banner text-white uppercase">{title}</h1>

        <nav aria-label="Breadcrumb" className="mt-5">
          <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/70">
            {crumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-lime">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {crumb.label}
                  </span>
                )}
                {index < crumbs.length - 1 ? (
                  <ChevronRightIcon aria-hidden="true" className="size-4 text-white/50" />
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
