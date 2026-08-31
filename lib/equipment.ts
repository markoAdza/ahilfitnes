/**
 * Katalog opreme — 16 naprav, štiri na kategorijo, da vsak filter na /oprema
 * izriše polno vrsto in ne razpršene.
 *
 * Kategorije nosijo eksplicitni `slug`: kotve v URL-ju so `#kardio`, `#moc`,
 * ... in ne izpeljane iz imena z `.toLowerCase()`, da v naslov nikoli ne
 * pridejo šumniki.
 */

export const categories = [
  { name: "Kardio", slug: "kardio" },
  { name: "Moč", slug: "moc" },
  { name: "Funkcionalno", slug: "funkcionalno" },
  { name: "Regeneracija", slug: "regeneracija" },
] as const;

export type Category = (typeof categories)[number]["name"];
export type CategorySlug = (typeof categories)[number]["slug"];

export type EquipmentItem = {
  slug: string;
  name: string;
  category: Category;
  blurb: string;
  specs: string[];
};

export const equipment: EquipmentItem[] = [
  // ---------------------------------------------------------------- Kardio
  {
    slug: "tekalne-steze",
    name: "Tekalne steze",
    category: "Kardio",
    blurb:
      "Profesionalne tekalne steze z naprednim blaženjem in nastavljivim naklonom",
    specs: [
      "12 naprav po vseh treh lokacijah",
      "Naklon do 15 %, spust do −3 %",
      "Blažilna deska razbremeni sklepe",
      "Vgrajeno merjenje srčnega utripa in programi",
    ],
  },
  {
    slug: "elipticni-trenazerji",
    name: "Eliptični trenažerji",
    category: "Kardio",
    blurb: "Vadba za celo telo z majhno obremenitvijo sklepov",
    specs: [
      "Modeli s prednjim in zadnjim pogonom",
      "20 stopenj magnetnega upora",
      "Premični ročaji vključijo zgornji del telesa",
      "Primerni za vadbo, prijazno sklepom",
    ],
  },
  {
    slug: "veslaski-trenazerji",
    name: "Veslaški trenažerji",
    category: "Kardio",
    blurb: "Zračni in vodni veslači za celovito kardio vadbo",
    specs: [
      "Modeli z zračnim in vodnim uporom",
      "Aktivirajo 86 % mišične mase",
      "Prikaz tempa, razdelka in vatov v živo",
      "Prednaloženi intervalni programi",
    ],
  },
  {
    slug: "sobna-kolesa",
    name: "Sobna kolesa",
    category: "Kardio",
    blurb: "Pokončna in ležeča kolesa z digitalnim merjenjem",
    specs: [
      "Pokončna, ležeča in spinning izvedba",
      "Magnetni upor, skoraj neslišna",
      "Popolnoma nastavljiv sedež in višina krmila",
      "Prikaz vatov, kadence in porabe",
    ],
  },

  // -------------------------------------------------------------------- Moč
  {
    slug: "proste-utezi",
    name: "Proste uteži",
    category: "Moč",
    blurb: "Celoten razpon ročk in uteži za vsako raven",
    specs: [
      "Ročke od 2 kg do 60 kg",
      "Olimpijske droge in gumirane uteži",
      "Nastavljive klopi pri vsakem stojalu",
      "Namenska dvigalna ploščad",
    ],
  },
  {
    slug: "kabelski-trenazerji",
    name: "Kabelski trenažerji",
    category: "Moč",
    blurb: "Dvojno nastavljiva škripca za neomejeno izbiro gibov",
    specs: [
      "Postaje z dvema nastavljivima škripcema",
      "Celotna zbirka nastavkov na mestu",
      "Gladki sklopi uteži v razmerju 2:1",
      "Postavitve za cross-over in funkcionalno vadbo",
    ],
  },
  {
    slug: "smithova-naprava",
    name: "Smithova naprava",
    category: "Moč",
    blurb: "Vodena vadba z drogom in varovali na vsaki višini",
    specs: [
      "Vodena pot droga na linearnih ležajih",
      "Varovala v več položajih",
      "Vadiš težko tudi brez pomočnika",
      "Pripravljena za počepe, potiske in dvige ramen",
    ],
  },
  {
    slug: "potisk-nog",
    name: "Naprava za potisk nog",
    category: "Moč",
    blurb: "Potisk nog in hack počep za moč spodnjega dela telesa",
    specs: [
      "Potisk pod 45 stopinjami, nakladanje z utežmi",
      "Prenese obremenitve nad 400 kg",
      "Nastavljiva hrbtna blazina in podnožje",
      "Možna pretvorba v hack počep",
    ],
  },

  // ------------------------------------------------------------ Funkcionalno
  {
    slug: "kettlebelli",
    name: "Kettlebelli",
    category: "Funkcionalno",
    blurb: "Tekmovalne girje za zamahe, nalaganja in nošenja",
    specs: [
      "Od 4 kg do 48 kg v enakomernih korakih",
      "Enotne tekmovalne mere",
      "Odprta površina z umetno travo za zamahe",
      "Prašno barvan oprijem",
    ],
  },
  {
    slug: "bojne-vrvi",
    name: "Bojne vrvi",
    category: "Funkcionalno",
    blurb: "Vrvi za intenzivno kondicijsko vadbo s pritrjenimi postajami",
    specs: [
      "Vrvi dolžine 15 m",
      "Postaje, pritrjene v tla",
      "Narejene za zaključke vadbe HIIT",
      "Dve postaji na lokacijo",
    ],
  },
  {
    slug: "pliometricne-skrinje",
    name: "Pliometrične skrinje",
    category: "Funkcionalno",
    blurb: "Mehke in lesene skrinje za eksplozivne skoke",
    specs: [
      "Višine od 30 cm do 75 cm",
      "Izvedba iz mehke pene in lesa",
      "Nedrseča površina za pristanek",
      "Zložljive za poljubno višino",
    ],
  },
  {
    slug: "trx-trakovi",
    name: "TRX vadbeni trakovi",
    category: "Funkcionalno",
    blurb: "Vadba z lastno telesno težo za trup in stabilnost",
    specs: [
      "Pritrdišča na stropu",
      "Od začetnika do napredne ravni",
      "Vaje za trup, poteg in gibljivost",
      "Prostor za štiri uporabnike",
    ],
  },

  // ------------------------------------------------------------ Regeneracija
  {
    slug: "masazni-valji",
    name: "Cona z masažnimi valji",
    category: "Regeneracija",
    blurb: "Valji, žogice in elastike za samomasažo",
    specs: [
      "Gladki in strukturirani valji",
      "Trde in dvojne masažne žogice",
      "Elastike vseh trdot",
      "Vodena rutina, izobešena na steni",
    ],
  },
  {
    slug: "prostor-za-razteg",
    name: "Prostor za razteg",
    category: "Regeneracija",
    blurb: "Odprta tla s podlogami za gibljivost in ohlajanje",
    specs: [
      "Blazinjena talna podloga",
      "Zrcala v polni višini",
      "Stojalo z elastikami za gibljivost",
      "Tiho območje stran od stojal",
    ],
  },
  {
    slug: "prostor-za-masazo",
    name: "Prostor za masažo",
    category: "Regeneracija",
    blurb: "Zaseben prostor za športno masažo z usposobljenimi maserji",
    specs: [
      "Usposobljeni športni maserji",
      "Na voljo 60-minutni termini",
      "Rezervacija v Hrastniku in Sevnici",
      "Naročiš se na recepciji ali po telefonu",
    ],
  },
  {
    slug: "savna",
    name: "Savna",
    category: "Regeneracija",
    blurb: "Finska savna za sprostitev in hitrejšo regeneracijo",
    specs: [
      "Klasična finska suha toplota",
      "Vključena v vsako članarino",
      "Najem brisač na voljo kot doplačilo",
      "Takoj ob prhah",
    ],
  },
];

/** Štiri kategorije, kot se pojavijo na domači strani in v katalogu. */
export const categoryShowcase: {
  category: Category;
  slug: CategorySlug;
  image: string;
  focus: string;
  highlights: string[];
}[] = [
  {
    category: "Kardio",
    slug: "kardio",
    image: "/images/cardio.jpg",
    focus: "center",
    highlights: [
      "Tekalne steze",
      "Eliptični trenažerji",
      "Veslaški trenažerji",
      "Sobna kolesa",
    ],
  },
  {
    category: "Moč",
    slug: "moc",
    image: "/images/strength.jpg",
    focus: "center",
    highlights: [
      "Proste uteži",
      "Kabelski trenažerji",
      "Smithova naprava",
      "Naprava za potisk nog",
    ],
  },
  {
    category: "Funkcionalno",
    slug: "funkcionalno",
    image: "/images/hrastnik.jpg",
    focus: "center",
    highlights: [
      "Kettlebelli",
      "Bojne vrvi",
      "Pliometrične skrinje",
      "TRX vadbeni trakovi",
    ],
  },
  {
    category: "Regeneracija",
    slug: "regeneracija",
    image: "/images/sevnica.jpg",
    focus: "right",
    highlights: [
      "Cona z masažnimi valji",
      "Prostor za razteg",
      "Prostor za masažo",
      "Savna",
    ],
  },
];
