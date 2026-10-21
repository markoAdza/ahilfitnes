import Image from "next/image";
import Link from "next/link";

import { Divider } from "@/components/ui/Divider";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TikTokIcon,
} from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { eur } from "@/lib/i18n";
import { annualFee } from "@/lib/pricing";
import { locations, mailHref, mapsHref, nav, site, socials, telHref } from "@/lib/site";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
} as const;

/**
 * Noga: kako se vpišeš, kje smo in strani.
 *
 * Blok "Vpis" nosi kotvo `#vpis` — cilj vsakega gumba "Pridruži se", kadar
 * JavaScript ni na voljo in se dialog ne more odpreti. Ker je noga na vsaki
 * strani, kotva vedno obstaja.
 */
export function Footer() {
  return (
    <footer id="site-footer" className="relative bg-ink-2">
      <Divider />

      <div className="grain relative">
        <div className="container-page relative z-1 grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-8">
          {/* Znamka in vpis */}
          <div id="vpis" className="lg:col-span-4">
            <Image
              src="/brand/logo-light.svg"
              alt={site.name}
              width={1780}
              height={1936}
              unoptimized
              className="h-14 w-auto"
            />

            <Label as="h2" className="mt-10">
              Vpis
            </Label>
            <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-body">
              Pokliči ali piši in se dogovorimo za termin. V fitnesu plačaš karto — pri
              časovnih kartah še letno članarino ({eur(annualFee)}) — ter prevzameš kartico.
            </p>

            <a
              href={telHref(site.phone)}
              className="mt-6 flex items-center gap-2.5 text-chalk transition-colors hover:text-accent-bright"
            >
              <PhoneIcon className="size-4 text-accent" />
              <span className="nums type-h3">{site.phone}</span>
            </a>
            <a
              href={mailHref("Vpis")}
              className="mt-2.5 flex items-center gap-2.5 text-chalk transition-colors hover:text-accent-bright"
            >
              <MailIcon className="size-4 text-accent" />
              <span className="type-h3">{site.email}</span>
            </a>
          </div>

          {/* Lokacije */}
          <div className="lg:col-span-5">
            <Label as="h2">Lokacije</Label>
            <ul className="mt-6 flex flex-col gap-6">
              {locations.map((location) => (
                <li key={location.slug} className="flex gap-4 text-[0.9375rem]">
                  <span aria-hidden="true" className="type-serif w-7 shrink-0 text-xl leading-6 text-accent">
                    {location.numeral}
                  </span>
                  <div>
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

                    {location.phone ? (
                      <a
                        href={telHref(location.phone)}
                        className="nums link-underline mt-1 block text-body transition-colors hover:text-chalk"
                      >
                        {location.phone}
                      </a>
                    ) : null}
                  </div>
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
                {site.access}. Recepcije ni — vstopiš s svojo kartico, kadar ti
                ustreza.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-1 border-t border-line">
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
