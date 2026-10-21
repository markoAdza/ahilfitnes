/**
 * Slovenske jezikovne pomožne funkcije.
 *
 * Stran je enojezična, zato ni slovarjev in ni i18n knjižnice — tu živijo samo
 * tista pravila, ki jih angleška izvirna koda ni imela in jih slovenščina
 * zahteva: sklanjanje po številu, naštevanje, zapis valute in iskanje brez
 * strešic.
 */

/** Slovenske slovnične oblike po številu: ena, dve, nekaj (3–4), mnogo. */
export type PluralForms = [one: string, two: string, few: string, other: string];

/**
 * Izbere pravilno obliko za dano število po slovenskih pravilih (CLDR).
 *
 * Angleški izvirnik je nize sestavljal kot `${n} locations`, kar v slovenščini
 * razpade: 1 lokacija, 2 lokaciji, 3 lokacije, 5 lokacij. Števila na strani so
 * danes fiksna (3 lokacije, 16 naprav), a ker so izpeljana iz dolžine polj,
 * ostanejo pravilna tudi če stranka doda četrti fitnes.
 *
 * @example plural(3, ["lokacija", "lokaciji", "lokacije", "lokacij"]) // "lokacije"
 */
export function plural(count: number, forms: PluralForms): string {
  const n = Math.abs(Math.trunc(count)) % 100;

  if (n === 1) return forms[0];
  if (n === 2) return forms[1];
  if (n === 3 || n === 4) return forms[2];
  return forms[3];
}

/** Število in pravilna oblika skupaj: `3 lokacije`. */
export function pluralize(count: number, forms: PluralForms): string {
  return `${count} ${plural(count, forms)}`;
}

/**
 * Cena po slovenski konvenciji: `65 €`, ne `€65`.
 *
 * Presledek je nedeljivi (U+00A0), da se številka in simbol nikoli ne razideta
 * na dve vrstici — v ozkih stolpcih cenika se to sicer zgodi.
 */
export function eur(amount: number): string {
  return `${amount} €`;
}

/**
 * Zloži besedilo za primerjavo: male črke in brez strešic.
 *
 * Nujno za iskanje po slovenskem besedilu — kdor išče napravo za moč, bo skoraj
 * zagotovo vtipkal "moc", in "žogo" mora najti tudi tisti, ki napiše "zoga".
 * Razpon U+0300–U+036F so kombinirajoča ločevalna znamenja, ki jih pusti NFD.
 */
export function fold(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/**
 * Našteje elemente po slovensko: `a, b in c` (ali `a, b ali c`).
 *
 * V slovenščini pred zadnjim členom ni vejice (nasprotno od oxfordske vejice),
 * zato `Array.join(", ")` iz angleškega izvirnika ne zadošča.
 */
export function listSl(
  items: readonly string[],
  conjunction: "in" | "ali" = "in",
): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} ${conjunction} ${items[items.length - 1]}`;
}

/** Pogosto uporabljene oblike, da se ne ponavljajo po komponentah. */
export const forms = {
  lokacija: ["lokacija", "lokaciji", "lokacije", "lokacij"] as PluralForms,
  naprava: ["naprava", "napravi", "naprave", "naprav"] as PluralForms,
  karta: ["karta", "karti", "karte", "kart"] as PluralForms,
  ura: ["ura", "uri", "ure", "ur"] as PluralForms,
  mesec: ["mesec", "meseca", "mesece", "mesecev"] as PluralForms,
  /*
   * Mestnik — za predlogom "v". Imenovalniške oblike zgoraj tu ne delujejo:
   * "prihraniš 42 € v 6 mesecev" je napaka, pravilno je "v 6 mesecih". To je
   * natanko tista vrsta spodrsljaja, po kateri se prevod prepozna kot strojni.
   */
  mesecLoc: ["mesecu", "mesecih", "mesecih", "mesecih"] as PluralForms,
  vprasanje: ["vprašanje", "vprašanji", "vprašanja", "vprašanj"] as PluralForms,
  zadetek: ["zadetek", "zadetka", "zadetki", "zadetkov"] as PluralForms,
} as const;
