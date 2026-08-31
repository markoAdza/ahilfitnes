/**
 * Vse cene na strani živijo tu, da se cenik na domači strani in cenik na
 * /cenik nikoli ne razideta. Zneski so prevzeti iz prvotnega osnutka.
 *
 * Zneski so števila, ne nizi: `eur()` iz lib/i18n.ts jih izpiše po slovenski
 * konvenciji (`49 €`), prihranke pa preklopnik paketov izračuna, da se
 * besedilo ne more razlikovati od številke.
 */

export type Plan = {
  slug: string;
  name: string;
  /** Dolžina zaveze v mesecih. 1 = mesečna, ki se obnavlja. */
  months: number;
  /** Efektivna cena na mesec, v evrih. */
  monthly: number;
  /** Skupni znesek, plačan vnaprej. Null pri mesečni članarini. */
  upfront: number | null;
  /** Kako se članarina obračuna, v preprostih besedah. */
  billing: string;
  /** Prihranek glede na mesečno ceno, v evrih. Null, kadar ga ni. */
  savings: number | null;
  /** Označi članarino, na katero fitnes usmerja ljudi. Največ ena. */
  recommended: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    slug: "mesecno",
    name: "Mesečno",
    months: 1,
    monthly: 49,
    upfront: null,
    billing: "Obračun vsak mesec, prekineš kadar koli",
    savings: null,
    recommended: false,
    features: [
      "24-urni dostop do vseh treh fitnesov",
      "Garderoba in prhe",
      "Savna",
      "Brezplačen WiFi",
    ],
  },
  {
    slug: "6-mesecev",
    name: "6 mesecev",
    months: 6,
    monthly: 42,
    upfront: 252,
    billing: "252 € plačaš vnaprej",
    savings: 42,
    recommended: true,
    features: [
      "Vse iz mesečne članarine",
      "Ocena telesne pripravljenosti ob vpisu",
      "Vodnik po prehrani",
      "Dve vstopnici za goste na mesec",
    ],
  },
  {
    slug: "12-mesecev",
    name: "12 mesecev",
    months: 12,
    monthly: 37,
    upfront: 444,
    billing: "444 € plačaš vnaprej",
    savings: 144,
    recommended: false,
    features: [
      "Vse iz 6-mesečne članarine",
      "En osebni trening na mesec",
      "Neomejene vstopnice za goste",
      "Dogodki za člane",
    ],
  },
];

/** Najnižja efektivna mesečna cena, navedena na domači strani. */
export const fromPrice = Math.min(...plans.map((plan) => plan.monthly));

/** Cena dnevne vstopnice — navedena na več mestih, zato stoji tu. */
export const dayPassPrice = 15;

export type PriceRow = {
  service: string;
  /** Znesek v evrih; izpis prek `eur()`. */
  price: number;
  /** Drobna opomba pod imenom storitve — podrobnost obračuna ali prihranek. */
  note?: string;
};

export type PriceGroup = {
  title: string;
  rows: PriceRow[];
};

/**
 * Celoten cenik, po skupinah.
 *
 * To nadomešča prejšnjo ravno tabelo in drugo sekcijo "Dodatne storitve", ki je
 * navajala istih dvanajst zneskov znova — ena skupinska tabela je krajša za
 * branje in si ne more nasprotovati.
 */
export const priceGroups: PriceGroup[] = [
  {
    title: "Članarina",
    rows: [
      { service: "Mesečno", price: 49, note: "Se obnavlja, prekineš kadar koli" },
      { service: "6 mesecev", price: 252, note: "Znese 42 € na mesec" },
      { service: "12 mesecev", price: 444, note: "Znese 37 € na mesec" },
      { service: "Dnevna vstopnica", price: 15, note: "Za obiskovalce in goste" },
    ],
  },
  {
    title: "Osebni trening",
    rows: [
      { service: "En trening", price: 45 },
      { service: "Pet treningov", price: 200, note: "Prihraniš 25 €" },
      { service: "Deset treningov", price: 380, note: "Prihraniš 70 €" },
    ],
  },
  {
    title: "Skupinske vadbe",
    rows: [
      { service: "Posamezna vadba", price: 15 },
      { service: "Paket desetih vadb", price: 120, note: "Prihraniš 30 €" },
      { service: "Neomejeno, na mesec", price: 80 },
    ],
  },
  {
    title: "Dodatno",
    rows: [
      { service: "Najem omarice, na mesec", price: 10 },
      { service: "Najem brisač, na mesec", price: 15 },
      { service: "Masaža, 60 minut", price: 60 },
    ],
  },
];
