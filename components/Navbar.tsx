"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { JoinButton } from "@/components/JoinButton";
import {
  ArrowUpRightIcon,
  CloseIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { mailHref, nav, site, telHref } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  /*
   * Na domači strani se navigacija začne prosojna nad hero fotografijo in
   * postane polna, ko sentinel na vrhu dokumenta zapusti zaslon. Na podstraneh
   * je vedno polna, ker se vsebina začne takoj pod njo.
   */
  const overHero = pathname === "/";
  const solid = !overHero || scrolled || open;

  // Zapri mobilni panel ob vsaki menjavi poti.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prepreči drsenje strani za odprtim panelom.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape zapre panel — pričakovano za vsako celozaslonsko prekritje.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Sentinel namesto poslušalca drsenja: en dogodek na prehod, ne na piksel.
  useEffect(() => {
    const element = sentinel.current;
    if (!element || !("IntersectionObserver" in window)) {
      setScrolled(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => setScrolled(!entries[0]?.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/*
       * Sidro na izhodišču dokumenta. Brez pozicioniranega prednika se veže na
       * začetni vsebovalni blok, torej na vrh strani in ne na zaslon.
       */}
      <div
        ref={sentinel}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-16 w-px"
      />

      <header
        className={[
          "sticky top-0 z-50 border-b transition-colors duration-300",
          solid
            ? "border-line bg-ink/92 backdrop-blur-md"
            : "border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="shrink-0"
            aria-label={`${site.name} — domov`}
          >
            {/* Vektorska sled originalnega logotipa, v kredi za temno podlago. */}
            <Image
              src="/brand/logo-light.svg"
              alt={site.name}
              width={1780}
              height={1936}
              priority
              unoptimized
              className="h-10 w-auto"
            />
          </Link>

          {/*
           * Namizna navigacija. Vsaka povezava zapolni višino navigacije, da
           * oznaka aktivne strani pristane natanko na lasnici pod glavo.
           */}
          <nav aria-label="Glavna navigacija" className="hidden lg:block">
            <ul className="flex items-stretch gap-8">
              {nav.map((item) => (
                <li key={item.href} className="flex">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={[
                      "-mb-px inline-flex h-16 items-center border-b-2 text-[0.9375rem] transition-colors",
                      isActive(item.href)
                        ? "border-accent-bright font-medium text-chalk"
                        : "border-transparent text-body hover:text-chalk",
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
              className="hidden items-center gap-2 text-[0.9375rem] text-body transition-colors hover:text-chalk lg:flex"
            >
              <PhoneIcon className="size-4 text-muted" />
              <span className="nums">{site.phone}</span>
            </a>

            <JoinButton size="md">Pridruži se</JoinButton>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Zapri meni" : "Odpri meni"}
              className="-mr-2 rounded-[2px] p-2 text-chalk transition-colors hover:bg-ink-3 lg:hidden"
            >
              {open ? (
                <CloseIcon className="size-6" />
              ) : (
                <MenuIcon className="size-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/*
       * Mobilno prekritje. Ostane priklopljeno, da postavke lahko stopničasto
       * vstopijo — iz display:none prehodi ne stečejo. `inert` ga medtem umakne
       * iz vrstnega reda tabulatorja in iz drevesa dostopnosti.
       */}
      <div
        id="mobile-nav"
        inert={!open}
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-40 flex flex-col bg-ink pt-16 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <nav
          aria-label="Mobilna navigacija"
          className="container-page flex flex-1 flex-col overflow-y-auto pt-6 pb-8"
        >
          <ul className="flex flex-col border-t border-line">
            {nav.map((item, index) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  style={{ transitionDelay: open ? `${60 + index * 45}ms` : "0ms" }}
                  className={[
                    "flex items-center justify-between gap-4 py-5 transition-all duration-300",
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "type-h2",
                      isActive(item.href) ? "text-accent-bright" : "text-chalk",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    className="size-5 shrink-0 text-muted"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <Label>Vpis po telefonu ali e-pošti</Label>
            <a
              href={telHref(site.phone)}
              className="mt-4 flex items-center gap-3 text-chalk"
            >
              <PhoneIcon className="size-5 text-accent" />
              <span className="nums type-h3">{site.phone}</span>
            </a>
            <a
              href={mailHref("Vpis")}
              className="mt-3 flex items-center gap-3 text-chalk"
            >
              <MailIcon className="size-5 text-accent" />
              <span className="type-h3">{site.email}</span>
            </a>
            <p className="mt-4 text-sm text-muted">{site.access}.</p>
          </div>
        </nav>
      </div>
    </>
  );
}
