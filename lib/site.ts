import { listSl } from "@/lib/i18n";

/**
 * Edini vir resnice za vse poslovne in kontaktne podatke na strani.
 *
 * POZOR: glavna telefonska številka ter naslova za Hrastnik in Trbovlje so
 * NADOMESTKI. Popravi jih tu enkrat in vsaka stran, kartica, noga in `tel:`
 * povezava se posodobi sama. Celoten seznam je v PODATKI-ZA-ZAMENJAVO.md.
 */

export type Location = {
  slug: string;
  name: string;
  /** "v Hrastniku" — za stavke, kot je opis strani. */
  locative: string;
  /** Rimska številka lokacije, izrisana v serifni kurzivi. */
  numeral: string;
  /** Pokrajina, prikazana kot oznaka ob imenu. */
  region: string;
  address: string;
  /** Neobvezna — kjer številka lokacije ni znana, kartica pokaže glavno. */
  phone?: string;
  amenities: string[];
  image: string;
  /** object-position, da posnetek v kartici pokaže pravi del prostora. */
  focus: string;
};

/*
 * Vse tri lokacije so odprte 24/7 brez recepcije, vse imajo brezplačno
 * parkiranje ter garderobe in prhe. Druge ugodnosti niso potrjene in se na
 * strani ne omenjajo.
 *
 * Fotografije so nadomestne (Unsplash) in NISO posnete v teh fitnesih —
 * zamenjaj jih s pravimi, preden gre stran v produkcijo.
 */
export const locations: Location[] = [
  {
    slug: "hrastnik",
    name: "Hrastnik",
    locative: "Hrastniku",
    numeral: "I",
    region: "Zasavje",
    address: "[naslov], 1430 Hrastnik",
    amenities: ["Brezplačno parkiranje", "Garderobe in prhe"],
    image: "/images/lokacija-hrastnik.jpg",
    focus: "center",
  },
  {
    slug: "trbovlje",
    name: "Trbovlje",
    locative: "Trbovljah",
    numeral: "II",
    region: "Zasavje",
    address: "[naslov], 1420 Trbovlje",
    amenities: ["Brezplačno parkiranje", "Garderobe in prhe"],
    image: "/images/lokacija-trbovlje.jpg",
    focus: "center",
  },
  {
    slug: "sevnica",
    name: "Sevnica",
    locative: "Sevnici",
    numeral: "III",
    region: "Posavje",
    address: "Glavni trg 19, 8290 Sevnica",
    phone: "+386 7 816 9012",
    amenities: ["Brezplačno parkiranje", "Garderobe in prhe"],
    image: "/images/lokacija-sevnica.jpg",
    focus: "center",
  },
];

export const site = {
  name: "Ahil Fitnes",
  tagline: "Fitnes, odprt 24 ur na dan.",
  description: `Fitnes, odprt 24 ur na dan, v ${listSl(
    locations.map((location) => location.locative),
  )}. Vsaka karta velja na vseh lokacijah.`,
  url: "https://ahil-fitness.vercel.app",

  /** Glavna kontaktna številka v navigaciji, ki jo uporablja vsak CTA. */
  phone: "+386 1 234 5678",

  /** Vpis poteka po telefonu ali po e-pošti. */
  email: "ahilfitnes@gmail.com",

  /** Recepcije ni — vstop s kartico, 24 ur na dan, vse dni v letu. */
  access: "Odprto 24/7, vstop s kartico",
} as const;

/** `mailto:` s predizpolnjeno zadevo in telesom sporočila. */
export function mailHref(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  // URLSearchParams kodira presledke kot "+", ki jih poštni odjemalci izpišejo dobesedno.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.email}${query ? `?${query}` : ""}`;
}

/** Odstrani presledke, da se prikazana številka lahko uporabi v `tel:`. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

/** Povezava do Zemljevidov Google, da lahko vsaka lokacija odpre navodila. */
export function mapsHref(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.name} ${address}`,
  )}`;
}

/**
 * Vdelan zemljevid za `MapPanel`. Vstavi se šele, ko obiskovalec klikne, zato
 * do takrat ni nobenega zahtevka proti Googlu.
 */
export function mapEmbedHref(address: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;
}

export const nav = [
  { label: "Domov", href: "/" },
  { label: "Oprema", href: "/oprema" },
  { label: "Cenik", href: "/cenik" },
  { label: "Pogosta vprašanja", href: "/pogosta-vprasanja" },
] as const;

/** NADOMESTKI — prave profile vpiši, ko jih stranka sporoči. */
export const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
] as const;

/**
 * Fotografije za galerijo. NADOMESTNE (Unsplash) in NISO posnete v fitnesih
 * Ahil — zato jih stran opiše kot vzdušje in ne kot "naše prostore". Ko
 * stranka dostavi svoje, se zamenjajo tu. Avtorji so v public/images/CREDITS.md.
 */
export const gallery = [
  { src: "/images/galerija-1.jpg", alt: "Ročka s ploščami na temni podlagi" },
  {
    src: "/images/galerija-2.jpg",
    alt: "Moški med zgibi na drogu, posnet od zadaj",
    focus: "center 20%",
  },
  { src: "/images/galerija-3.jpg", alt: "Plošča za 20 kilogramov na olimpijski palici" },
  { src: "/images/galerija-4.jpg", alt: "Palica s ploščami na tleh vadbenega prostora" },
  { src: "/images/galerija-5.jpg", alt: "Stojalo z ročkami v polmraku" },
  { src: "/images/galerija-6.jpg", alt: "Roka v magneziju dviguje girjo" },
] as const;
