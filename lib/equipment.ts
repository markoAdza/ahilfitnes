/**
 * Oprema po štirih conah.
 *
 * POZOR: seznami naprav spodaj so NADOMESTKI (`placeholder: true`) — splošna
 * imena brez števil in specifikacij, dokler stranka ne dostavi pravega
 * seznama opreme in znamk. Ničesar, česar ni mogoče preveriti (število
 * naprav, nosilnost, znamke), ne navajamo. Glej PODATKI-ZA-ZAMENJAVO.md.
 *
 * Kategorije nosijo eksplicitni `slug`: kotve v URL-ju so `#proste-utezi`,
 * `#kardio`, ... in ne izpeljane iz imena, da v naslov nikoli ne pridejo
 * šumniki.
 *
 * Fotografije so nadomestne (Unsplash) in niso posnete v fitnesih Ahil.
 */

export type EquipmentItem = {
  name: string;
  /** Ime še ni potrjeno s strani stranke. */
  placeholder?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  /** Rimska številka cone, izrisana v serifni kurzivi. */
  numeral: string;
  description: string;
  image: string;
  /** object-position, da posnetek v kartici pokaže pravi del prostora. */
  focus: string;
  items: EquipmentItem[];
};

export const categories: Category[] = [
  {
    slug: "proste-utezi",
    name: "Proste uteži",
    numeral: "I",
    description:
      "Ročke, palice in plošče za osnovne gibe — počep, mrtvi dvig, potiski in vlečenja.",
    image: "/images/oprema-proste-utezi.jpg",
    focus: "center",
    items: [
      { name: "Ročke", placeholder: true },
      { name: "Olimpijske palice in plošče", placeholder: true },
      { name: "Nastavljive klopi", placeholder: true },
      { name: "Stojala za počep", placeholder: true },
    ],
  },
  {
    slug: "naprave-na-plosce",
    name: "Naprave na plošče",
    numeral: "II",
    description:
      "Naprave, na katere sam naložiš plošče. Gib teče po vodeni poti, upor pa je pravo železo.",
    image: "/images/oprema-naprave-na-plosce.jpg",
    focus: "center 40%",
    items: [
      { name: "Potisk z nogami", placeholder: true },
      { name: "Potisk s prsi", placeholder: true },
      { name: "Veslanje", placeholder: true },
      { name: "Potisk nad glavo", placeholder: true },
    ],
  },
  {
    slug: "kardio",
    name: "Kardio",
    numeral: "III",
    description:
      "Za ogrevanje, vzdržljivost in dneve, ko je na sporedu samo srce.",
    image: "/images/oprema-kardio.jpg",
    focus: "center 60%",
    items: [
      { name: "Tekalne steze", placeholder: true },
      { name: "Sobna kolesa", placeholder: true },
      { name: "Eliptični trenažerji", placeholder: true },
      { name: "Veslaški trenažerji", placeholder: true },
    ],
  },
  {
    slug: "funkcionalna-cona",
    name: "Funkcionalna cona",
    numeral: "IV",
    description:
      "Odprt prostor za vaje s telesno težo, girjami in pripomočki — brez naprave, ki bi vodila gib.",
    image: "/images/oprema-funkcionalna-cona.jpg",
    focus: "center",
    items: [
      { name: "Girje", placeholder: true },
      { name: "Medicinke", placeholder: true },
      { name: "Skakalne skrinje", placeholder: true },
      { name: "Vadbeni trakovi", placeholder: true },
    ],
  },
];
