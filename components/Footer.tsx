import Image from "next/image";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  TikTokIcon,
} from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { locations, nav, site, socials, telHref } from "@/lib/site";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
} as const;

/**
 * The newsletter signup that used to sit here has been removed rather than
 * restyled: it had no backend and confirmed "you are on the list" regardless,
 * which is the one thing a footer must not do. The space now carries the
 * addresses and phone numbers people come to a footer looking for.
 */
export function Footer() {
  return (
    <footer className="on-dark bg-ink text-white/60">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={132}
            height={148}
            /* The logo art is black on transparent; invert it for dark ground. */
            className="h-11 w-auto brightness-0 invert"
          />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed">
            {site.tagline}
          </p>
        </div>

        {/* Locations */}
        <div className="lg:col-span-5">
          <Label as="h2" tone="light">
            Locations
          </Label>
          <ul className="mt-6 flex flex-col gap-5">
            {locations.map((location) => (
              <li key={location.slug} className="text-[0.9375rem]">
                <p className="font-medium text-white">{location.name}</p>
                <p className="mt-0.5">{location.address}</p>
                <a
                  href={telHref(location.phone)}
                  className="nums link-underline mt-0.5 inline-block transition-colors hover:text-white"
                >
                  {location.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Pages + contact */}
        <div className="lg:col-span-3">
          <Label as="h2" tone="light">
            Pages
          </Label>
          <ul className="mt-6 flex flex-col gap-3 text-[0.9375rem]">
            {nav
              .filter((item) => item.href !== "/")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>

          <div className="mt-10 border-t border-white/10 pt-6">
            <a
              href={telHref(site.phone)}
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-white transition-colors hover:text-white/70"
            >
              <PhoneIcon className="size-4 text-white/50" />
              <span className="nums">{site.phone}</span>
            </a>
            <p className="mt-2 text-sm">
              Gyms open 24 hours. Reception {site.reception}.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
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
                    className="inline-flex text-white/50 transition-colors hover:text-white"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
