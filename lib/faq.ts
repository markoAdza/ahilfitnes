import { site } from "@/lib/site";

/**
 * Pogosta vprašanja.
 *
 * Imena paketov in zneski se morajo ujemati z lib/pricing.ts, kontaktna
 * številka pa je vstavljena iz lib/site.ts in ne prepisana, da popravek
 * nadomestne telefonske številke na enem mestu popravi vse.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Kdaj ste odprti?",
    answer:
      "Fitnesi so odprti 24 ur na dan, 365 dni na leto, na vseh treh lokacijah. Recepcija je zasedena med tednom od 9.00 do 20.00 in v soboto od 9.00 do 13.00 — takrat pridi, če želiš ogled, podpis pogodbe ali odgovor v živo.",
  },
  {
    question: "Ali moram opremo rezervirati vnaprej?",
    answer:
      "Za nobeno napravo rezervacija ni potrebna — prideš in vadiš. Vnaprej se je vredno dogovoriti le za osebni trening in masažo, kar urediš na recepciji ali po telefonu.",
  },
  {
    question: "Ali lahko z eno članarino uporabljam vse tri fitnese?",
    answer:
      "Da. Vsaka članarina vključuje neomejen 24-urni dostop do Hrastnika, Zagorja in Sevnice brez doplačila, z isto kartico.",
  },
  {
    question: "Ali je vpisnina ali minimalna vezava?",
    answer:
      "Vpisnine ni. Mesečna članarina znaša 49 € in se obnavlja iz meseca v mesec brez minimalne vezave. Šestmesečna (252 €) in dvanajstmesečna (444 €) se plačata vnaprej, v zameno za nižjo mesečno ceno.",
  },
  {
    question: "Ali lahko članarino zamrznem ali prekinem?",
    answer:
      "Mesečno članarino lahko prekineš kadar koli pred naslednjim obračunom — brez odpovednega roka in brez stroškov. Pri šest- in dvanajstmesečni jo lahko zamrzneš za največ dva meseca na obdobje zaradi zdravstvenih razlogov ali daljše odsotnosti; povej ekipi in uredimo.",
  },
  {
    question: "Ali ponujate vstopnice za goste?",
    answer:
      "Šestmesečna članarina vključuje dve vstopnici za goste na mesec, dvanajstmesečna pa neomejeno. Če imaš mesečno članarino, lahko nekoga pripelješ z dnevno vstopnico za 15 €.",
  },
  {
    question: "Kako poteka osebni trening?",
    answer:
      "Vsi naši trenerji so usposobljeni in na voljo na vseh lokacijah. En trening je 45 €, pet treningov 200 € in deset treningov 380 €. Pri dvanajstmesečni članarini je en trening na mesec vključen.",
  },
  {
    question: "Kaj je na posamezni lokaciji?",
    answer:
      "Vsak fitnes ima brezplačno parkiranje, garderobe, prhe in savno. Hrastnik in Sevnica imata še zaseben prostor za masažo, Zagorje pa studio za skupinske vadbe.",
  },
  {
    question: "Ali ponujate skupinske vadbe?",
    answer:
      "Da. Posamezna vadba je 15 €, paket desetih vadb 120 €, ali pa članarini dodaš neomejene vadbe za 80 € na mesec. Trenutni urnik je izobešen na recepciji v vsakem fitnesu.",
  },
  {
    question: "Kako se vpišem?",
    answer: `Pokliči ${site.phone} ali se oglasi v katerem koli od treh fitnesov v času recepcije. Razkažemo ti prostore, skupaj izberemo pravo članarino in lahko vadiš že isti dan.`,
  },
];
