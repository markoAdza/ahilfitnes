/**
 * Edini vir resnice za vse poslovne in kontaktne podatke na strani.
 *
 * POZOR: glavna telefonska številka ter naslova in številki za Hrastnik in
 * Zagorje so NADOMESTKI, prevzeti iz prvotnega osnutka. Popravi jih tu enkrat
 * in vsaka stran, kartica, noga in `tel:` povezava se posodobi sama.
 * Celoten seznam je v PODATKI-ZA-ZAMENJAVO.md.
 */

export const site = {
  name: "Ahil Fitnes",
  tagline: "Lokalna fitnes skupina v Zasavju, odprta od leta 2020.",
  description:
    "Trije fitnesi v Hrastniku, Zagorju in Sevnici, odprti 24 ur na dan. Ena članarina odpre vse tri.",
  url: "https://ahil-fitness.vercel.app",

  /** Glavna kontaktna številka v navigaciji, ki jo uporablja vsak CTA. */
  phone: "+386 1 234 5678",

  /** Ure recepcije — fitnesi sami se nikoli ne zaprejo. */
  reception: "med tednom 9.00–20.00, v soboto 9.00–13.00",

  founded: 2020,
} as const;

/**
 * Ure recepcije v strojno berljivi obliki, da lahko `ReceptionStatus` pove,
 * ali je recepcija odprta zdaj, ne da bi razčlenjeval niz zgoraj.
 * Ure so lokalne (Europe/Ljubljana).
 */
export const receptionHours = {
  /** Ponedeljek–petek. */
  weekday: { from: 9, to: 20 },
  /** Sobota. */
  saturday: { from: 9, to: 13 },
  /** V nedeljo je recepcija zaprta; fitnesi so odprti. */
  sunday: null,
} as const;

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

export type Location = {
  slug: string;
  name: string;
  /** Pokrajina, prikazana kot oznaka ob imenu. */
  region: string;
  address: string;
  phone: string;
  amenities: string[];
  image: string;
  /** object-position, da se razpoložljive fotografije berejo kot različne sobe. */
  focus: string;
};

export const locations: Location[] = [
  {
    slug: "hrastnik",
    name: "Hrastnik",
    region: "Zasavje",
    address: "Log 24, 1430 Hrastnik",
    phone: "+386 3 564 2210",
    amenities: [
      "Brezplačno parkiranje",
      "Garderobe",
      "Prhe",
      "Savna",
      "Prostor za masažo",
    ],
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
      "Brezplačno parkiranje",
      "Garderobe",
      "Prhe",
      "Savna",
      "Studio za skupinske vadbe",
    ],
    /* Nadomestna fotografija — na voljo je šest različnih posnetkov notranjosti
       in nobeden ni izrecno iz Zagorja, zato vsaka lokacija prikaže drugo sobo,
       dokler stranka ne dostavi svojih fotografij. */
    image: "/images/sevnica.jpg",
    focus: "center",
  },
  {
    slug: "sevnica",
    name: "Sevnica",
    region: "Posavje",
    address: "Glavni trg 19, 8290 Sevnica",
    phone: "+386 7 816 9012",
    amenities: [
      "Brezplačno parkiranje",
      "Garderobe",
      "Prhe",
      "Savna",
      "Prostor za masažo",
    ],
    /* Nadomestna fotografija — glej opombo pri Zagorju. */
    image: "/images/equipment-hero.jpg",
    focus: "center",
  },
];

export const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
] as const;

/**
 * Fotografije, ki so na voljo za galerijo. Vseh šest je različnih posnetkov
 * notranjosti; ko stranka dostavi svoje, se zamenjajo tu.
 */
export const gallery = [
  { src: "/images/hero.jpg", alt: "Prostor s prostimi utežmi, osvetljen rdeče" },
  { src: "/images/strength.jpg", alt: "Stojala z ročkami in klopi na oddelku za moč" },
  { src: "/images/cardio.jpg", alt: "Vrsta tekalnih stez na kardio oddelku" },
  {
    src: "/images/equipment-hero.jpg",
    alt: "Pogled po vadbenem prostoru z napravami za moč",
  },
  { src: "/images/hrastnik.jpg", alt: "Vadbeni prostor v fitnesu Hrastnik" },
  { src: "/images/sevnica.jpg", alt: "Naprave za funkcionalno vadbo ob oknu" },
] as const;
