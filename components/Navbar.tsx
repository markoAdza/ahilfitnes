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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Deepen the bottom edge once the page has moved, as in the reference.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={[
        "sticky top-0 z-50 bg-white transition-shadow duration-200",
        scrolled ? "shadow-[0_1px_16px_rgba(15,23,41,0.08)]" : "border-b border-line",
      ].join(" ")}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${site.name} — home`}
        >
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={132}
            height={148}
            priority
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={[
                    "text-[0.9375rem] font-medium transition-colors",
                    isActive(item.href)
                      ? "text-lime-ink"
                      : "text-ink hover:text-lime-ink",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={telHref(site.phone)}
            className="hidden items-center gap-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-lime-ink lg:flex"
          >
            <PhoneIcon className="size-4" />
            {site.phone}
          </a>

          <ButtonLink href={telHref(site.phone)} variant="lime">
            Join Now
          </ButtonLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-1 rounded-full p-2 text-ink transition-colors hover:bg-surface lg:hidden"
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
        <nav aria-label="Mobile" className="container-page py-6">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={[
                    "block rounded-xl px-3 py-3 text-lg font-semibold transition-colors",
                    isActive(item.href)
                      ? "bg-surface text-lime-ink"
                      : "text-ink hover:bg-surface",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={telHref(site.phone)}
            className="mt-4 flex items-center gap-2 px-3 text-base font-medium text-body"
          >
            <PhoneIcon className="size-4" />
            {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
