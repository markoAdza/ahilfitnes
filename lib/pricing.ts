/**
 * Vse cene na strani živijo tu, da se cenik na domači strani, cenik na /cenik
 * in odgovori v pogostih vprašanjih nikoli ne razidejo. Zneski so prepisani s
 * tiskanega cenika v fitnesu; vse cene so z DDV.
 *
 * Zneski so števila, ne nizi: `eur()` iz lib/i18n.ts jih izpiše po slovenski
 * konvenciji (`65 €`), mesečne in urne cene pa so izračunane, da se besedilo
 * ne more razlikovati od številke.
 */

export type Pass = {
  slug: string;
  name: string;
  /** Znesek v evrih. */
  price: number;
  /** `obisk` — karta za obiske; `cas` — karta za časovno obdobje. */
  kind: "obisk" | "cas";
  /** Koliko časa karta velja, v preprostih besedah. */
  validity: string;
  /** Dolžina karte v mesecih, kjer je smiselno izračunati mesečno ceno. */
  months?: number;
  /** Karta, na katero fitnes usmerja ljudi. Največ ena. */
  popular?: boolean;
};

/** Vrstni red je vrstni red na strani: od najkrajše zaveze do najdaljše. */
export const passes: Pass[] = [
  {
    slug: "enkratni-obisk",
    name: "Enkratni obisk",
    price: 15,
    kind: "obisk",
    validity: "Za en obisk",
  },
  {
    slug: "10-obiskov",
    name: "10 obiskov",
    price: 75,
    kind: "obisk",
    validity: "Velja 365 dni od nakupa karte",
  },
  {
    slug: "tedenska",
    name: "Tedenska karta",
    price: 25,
    kind: "cas",
    validity: "Velja 7 dni",
  },
  {
    slug: "mesecna",
    name: "Mesečna karta",
    price: 65,
    kind: "cas",
    validity: "Velja 1 mesec",
    months: 1,
    popular: true,
  },
  {
    slug: "polletna",
    name: "Polletna karta",
    price: 330,
    kind: "cas",
    validity: "Velja 6 mesecev",
    months: 6,
  },
  {
    slug: "letna",
    name: "Letna karta",
    price: 600,
    kind: "cas",
    validity: "Velja 12 mesecev",
    months: 12,
  },
];

/** Karta po slugu — za predogled cenika na domači strani. */
export function pass(slug: string): Pass {
  const found = passes.find((entry) => entry.slug === slug);
  if (!found) throw new Error(`Ni karte "${slug}" v lib/pricing.ts`);
  return found;
}

/** Mesečna cena daljše karte, zaokrožena na cel evro. */
export function perMonth(entry: Pass): number | null {
  if (!entry.months || entry.months < 2) return null;
  return Math.round(entry.price / entry.months);
}

/** Najnižja cena na strani — enkratni obisk. */
export const fromPrice = Math.min(...passes.map((entry) => entry.price));

/**
 * Letna članarina. Plača se le ob časovnih kartah — karte za obiske je nimajo,
 * zato jo kartica v ceniku navede samo tam, kjer velja.
 */
export const annualFee = 20;

/** Ali karta zahteva letno članarino. */
export function needsAnnualFee(entry: Pass): boolean {
  return entry.kind === "cas";
}

/** Izdelava nove kartice za vstop. */
export const cardFee = 10;

export type TrainingPackage = {
  hours: number;
  /** Ritem s tiskanega cenika, kjer je naveden. */
  cadence?: string;
  price: number;
};

/** Najem osebnega trenerja. Paketi veljajo do porabe. */
export const training: TrainingPackage[] = [
  { hours: 1, price: 35 },
  { hours: 4, cadence: "1× na teden", price: 120 },
  { hours: 8, cadence: "2× na teden", price: 200 },
  { hours: 12, cadence: "3× na teden", price: 240 },
];

/** Cena ure v paketu, zaokrožena na cel evro. */
export function perHour(entry: TrainingPackage): number {
  return Math.round(entry.price / entry.hours);
}

/** Najnižja urna cena osebnega trenerja — v največjem paketu. */
export const trainingFromPerHour = Math.min(...training.map(perHour));

export type Fee = {
  name: string;
  price: number;
  note: string;
};

export const otherFees: Fee[] = [
  {
    name: "Letna članarina",
    price: annualFee,
    note: "Obvezna za časovne karte, plača se enkrat na leto",
  },
  {
    name: "Izdelava nove kartice",
    price: cardFee,
    note: "Če kartico izgubiš ali poškoduješ",
  },
];
