import Image from "next/image";
import Link from "next/link";

import { ReceptionStatus } from "@/components/ReceptionStatus";
import {
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  PinIcon,
  TikTokIcon,
} from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { locations, mapsHref, nav, site, socials, telHref } from "@/lib/site";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
} as const;

/**
 * Prijava na e-novice, ki je nekoč stala tu, je odstranjena in ne prestiljena:
 * ni imela zaledja in je vseeno potrdila "na seznamu si", kar je edina stvar,
 * ki je noga ne sme narediti. Prostor zdaj nosi naslove in telefonske številke,
 * torej tisto, zaradi česar ljudje pridejo v nogo.
 */
export function Footer() {
  return (
    <footer
      id="site-footer"
      className="grain relative border-t border-line bg-ink-2"
    >
      <div className="relative z-1">
        <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Znamka */}
          <div className="lg:col-span-4">
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={132}
              height={148}
              /* Grafika logotipa je črna na prozornem; na temnem jo obrnemo. */
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-body">
              {site.tagline}
            </p>

            <a
              href={telHref(site.phone)}
              className="mt-7 inline-flex items-center gap-2.5 text-chalk transition-colors hover:text-accent"
            >
              <PhoneIcon className="size-4 text-accent" />
              <span className="nums type-h3">{site.phone}</span>
            </a>

            <ReceptionStatus className="mt-3" />
          </div>

          {/* Lokacije */}
          <div className="lg:col-span-5">
            <Label as="h2">Lokacije</Label>
            <ul className="mt-6 flex flex-col gap-6">
              {locations.map((location) => (
                <li key={location.slug} className="text-[0.9375rem]">
                  <p className="font-medium text-chalk">{location.name}</p>

                  <a
                    href={mapsHref(location.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-start gap-2 text-body transition-colors hover:text-chalk"
                  >
                    <PinIcon
                      aria-hidden="true"
                      className="mt-1 size-3.5 shrink-0 text-muted"
                    />
                    {location.address}
                  </a>

                  <a
                    href={telHref(location.phone)}
                    className="nums link-underline mt-1 block text-body transition-colors hover:text-chalk"
                  >
                    {location.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Strani */}
          <div className="lg:col-span-3">
            <Label as="h2">Strani</Label>
            <ul className="mt-6 flex flex-col gap-3 text-[0.9375rem]">
              {nav
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body transition-colors hover:text-chalk"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>

            <div className="mt-10 border-t border-line pt-6">
              <p className="text-sm text-muted">
                Fitnesi so odprti 24 ur na dan, 365 dni na leto. Recepcija je
                zasedena {site.reception}.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="container-page flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} {site.name}
            </p>

            <ul className="flex items-center gap-5">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex text-muted transition-colors hover:text-chalk"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
