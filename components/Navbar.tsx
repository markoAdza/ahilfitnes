"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";
import { nav, site, telHref } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent the page behind the open mobile panel from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={132}
            height={148}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/*
         * Desktop navigation. Each link fills the navbar height so the active
         * marker lands exactly on the header hairline, rather than recolouring
         * the label.
         */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-stretch gap-9">
            {nav.map((item) => (
              <li key={item.href} className="flex">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={[
                    "-mb-px inline-flex h-18 items-center border-b-2 text-[0.9375rem] transition-colors",
                    isActive(item.href)
                      ? "border-accent font-medium text-ink"
                      : "border-transparent text-body hover:text-ink",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={telHref(site.phone)}
            className="hidden items-center gap-2 text-[0.9375rem] text-body transition-colors hover:text-ink lg:flex"
          >
            <PhoneIcon className="size-4 text-muted" />
            <span className="nums">{site.phone}</span>
          </a>

          {/* Every join path on this site is a phone call, so the button says so. */}
          <ButtonLink href={telHref(site.phone)}>Call to join</ButtonLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 rounded-[2px] p-2 text-ink transition-colors hover:bg-sand lg:hidden"
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-2">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line-soft last:border-b-0">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={[
                    "flex items-center justify-between py-4 text-base transition-colors",
                    isActive(item.href) ? "font-medium text-ink" : "text-body",
                  ].join(" ")}
                >
                  {item.label}
                  {isActive(item.href) ? (
                    <span aria-hidden="true" className="size-1.5 bg-accent" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={telHref(site.phone)}
            className="flex items-center gap-2 py-5 text-[0.9375rem] text-body"
          >
            <PhoneIcon className="size-4 text-muted" />
            <span className="nums">{site.phone}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
