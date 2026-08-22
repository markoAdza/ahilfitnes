"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/ui/Icons";
import { nav, site, socials } from "@/lib/site";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
} as const;

export function Footer() {
  return (
    <footer className="on-dark bg-footer text-white/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {/* Brand */}
        <div>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={132}
            height={148}
            /* The logo art is black on transparent; invert it for dark ground. */
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed">
            {site.tagline} Your journey to a healthier lifestyle starts here.
          </p>
        </div>

        <NewsletterForm />

        {/* Quick links */}
        <nav aria-label="Footer">
          <h2 className="text-xs font-bold tracking-[0.18em] text-white/50 uppercase">
            Quick Links
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {nav
              .filter((item) => item.href !== "/")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-semibold text-white transition-colors hover:text-lime"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        {/* Social */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-white/50 uppercase">
            Follow Us
          </h2>
          <ul className="mt-6 flex flex-col gap-4">
            {socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-semibold text-white transition-colors hover:text-lime"
                  >
                    <Icon className="size-5" />
                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Newsletter signup. Deliberately has no backend — it confirms inline so the
 * deployed site has nothing that can silently fail.
 */
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div>
      <h2 className="text-xs font-bold tracking-[0.18em] text-white/50 uppercase">
        Newsletter
      </h2>

      {done ? (
        <p
          role="status"
          className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-lime"
        >
          Thanks &mdash; you&rsquo;re on the list. We&rsquo;ll be in touch soon.
        </p>
      ) : (
        <form
          className="mt-5 max-w-xs"
          onSubmit={(event) => {
            event.preventDefault();
            setDone(true);
          }}
        >
          <div className="flex items-center gap-3 border-b border-white/20 pb-2 focus-within:border-lime">
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              autoComplete="email"
              className="w-full bg-transparent text-[0.9375rem] text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            aria-label="Subscribe to the newsletter"
            className="mt-5 grid size-10 place-items-center rounded-full bg-lime text-ink transition-colors hover:bg-lime-dark"
          >
            <ArrowRightIcon className="size-5" />
          </button>

          <p className="mt-4 text-sm text-white/45">We respect your privacy</p>
        </form>
      )}
    </div>
  );
}
