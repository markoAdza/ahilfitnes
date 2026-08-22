/**
 * Single source of truth for every piece of business/contact data on the site.
 *
 * The phone numbers and the Hrastnik / Zagorje addresses are PLACEHOLDERS taken
 * from (or modelled on) the original design. Correct them here once and every
 * page, card, footer and `tel:` link updates automatically.
 */

export const site = {
  name: "Ahil Fitness",
  tagline: "Building stronger communities through fitness since 2020.",
  description:
    "24/7 gym with professional equipment, expert trainers and three convenient locations in Hrastnik, Zagorje and Sevnica.",
  url: "https://ahil-fitness.vercel.app",

  /** Main contact number shown in the navbar and used by every CTA. */
  phone: "+386 1 234 5678",

  founded: 2020,
} as const;

/** Strips spaces so the display number can be reused inside a `tel:` href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "Equipment", href: "/equipment" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
] as const;

export type Location = {
  slug: string;
  name: string;
  address: string;
  phone: string;
  amenities: string[];
  image: string;
  /** object-position, so the two available photos read as different rooms. */
  focus: string;
};

export const locations: Location[] = [
  {
    slug: "hrastnik",
    name: "Hrastnik",
    address: "Log 24, 1430 Hrastnik",
    phone: "+386 3 564 2210",
    amenities: ["Free Parking", "Locker Rooms", "Showers", "Massage"],
    image: "/images/hrastnik.jpg",
    focus: "center",
  },
  {
    slug: "zagorje",
    name: "Zagorje",
    address: "Cesta zmage 12, 1410 Zagorje ob Savi",
    phone: "+386 3 566 4180",
    amenities: ["Free Parking", "Locker Rooms", "Showers", "Group Classes"],
    image: "/images/sevnica.jpg",
    focus: "center",
  },
  {
    slug: "sevnica",
    name: "Sevnica",
    address: "Glavni trg 19, 8290 Sevnica",
    phone: "+386 7 816 9012",
    amenities: ["Free Parking", "Locker Rooms", "Showers", "Massage"],
    image: "/images/hrastnik.jpg",
    focus: "left",
  },
];

export const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
] as const;
