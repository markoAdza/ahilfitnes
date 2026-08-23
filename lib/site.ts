/**
 * Single source of truth for every piece of business/contact data on the site.
 *
 * The phone numbers and the Hrastnik / Zagorje addresses are PLACEHOLDERS taken
 * from (or modelled on) the original design. Correct them here once and every
 * page, card, footer and `tel:` link updates automatically.
 */

export const site = {
  name: "Ahil Fitness",
  tagline: "A local gym group in the Zasavje valley, open since 2020.",
  description:
    "Three gyms in Hrastnik, Zagorje and Sevnica, open 24 hours a day. One membership covers all of them.",
  url: "https://ahil-fitness.vercel.app",

  /** Main contact number shown in the navbar and used by every CTA. */
  phone: "+386 1 234 5678",

  /** Reception hours — the gyms themselves never close. */
  reception: "weekdays 09:00–20:00, Saturday 09:00–13:00",

  founded: 2020,
} as const;

/** Strips spaces so the display number can be reused inside a `tel:` href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

/** Directions link for an address, so each location card can open a map. */
export function mapsHref(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.name} ${address}`,
  )}`;
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
  /** Municipality, shown as a label above the name. */
  region: string;
  address: string;
  phone: string;
  amenities: string[];
  image: string;
  /** object-position, so the available photos read as different rooms. */
  focus: string;
};

export const locations: Location[] = [
  {
    slug: "hrastnik",
    name: "Hrastnik",
    region: "Zasavje",
    address: "Log 24, 1430 Hrastnik",
    phone: "+386 3 564 2210",
    amenities: ["Free parking", "Locker rooms", "Showers", "Sauna", "Massage room"],
    image: "/images/hrastnik.jpg",
    focus: "center",
  },
  {
    slug: "zagorje",
    name: "Zagorje ob Savi",
    region: "Zasavje",
    address: "Cesta zmage 12, 1410 Zagorje ob Savi",
    phone: "+386 3 566 4180",
    amenities: [
      "Free parking",
      "Locker rooms",
      "Showers",
      "Sauna",
      "Group-class studio",
    ],
    image: "/images/sevnica.jpg",
    focus: "center",
  },
  {
    slug: "sevnica",
    name: "Sevnica",
    region: "Posavje",
    address: "Glavni trg 19, 8290 Sevnica",
    phone: "+386 7 816 9012",
    amenities: ["Free parking", "Locker rooms", "Showers", "Sauna", "Massage room"],
    /* Stand-in photo — every location shows a different room rather than
       repeating one image, until real photography is available. */
    image: "/images/equipment-hero.jpg",
    focus: "center",
  },
];

export const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
] as const;
