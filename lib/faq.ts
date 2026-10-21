import { eur, listSl } from "@/lib/i18n";
import { annualFee, cardFee, pass, training } from "@/lib/pricing";
import { locations, site } from "@/lib/site";

/**
 * Pogosta vprašanja.
 *
 * Vsak znesek, ime karte, lokacija in kontakt je vstavljen iz lib/pricing.ts in
 * lib/site.ts, ne prepisan — popravek cene ali nadomestne telefonske številke
 * na enem mestu popravi tudi odgovore.
 *
 * Odgovori navajajo samo to, kar je stranka potrdila. Česar ne vemo (recepcija,
 * zamrznitev, vstopnice za goste), ne obljubljamo.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

const names = listSl(locations.map((location) => location.name));
const tenVisits = pass("10-obiskov");
const [single, ...packages] = training;

export const faqs: FaqItem[] = [
  {
    question: "Kako se vpišem?",
    answer: `Pokliči na ${site.phone} ali piši na ${site.email}. Dogovorimo se za termin in se dobimo v fitnesu, kjer plačaš izbrano karto — pri časovnih kartah še letno članarino (${eur(
      annualFee,
    )}) — ter prevzameš kartico za vstop. Od takrat prideš, kadar želiš.`,
  },
  {
    question: "Ali moja karta velja na vseh treh lokacijah?",
    answer: `Da. Vsaka karta — od enkratnega obiska do letne — velja v vseh treh fitnesih: ${names}. Z isto kartico in brez doplačila.`,
  },
  {
    question: "Kje so parkirišča?",
    answer:
      "Vsi trije fitnesi imajo brezplačno parkirišče tik ob vhodu.",
  },
  {
    question: "Kakšni so delovni časi?",
    answer:
      "Fitnesi so odprti 24 ur na dan, vse dni v letu. Recepcije ni — vstopiš s svojo kartico, kadar ti ustreza.",
  },
  {
    question: "Kaj je letna članarina?",
    answer: `Letna članarina znaša ${eur(
      annualFee,
    )} in se plača ob časovnih kartah (tedenska, mesečna, polletna, letna) — ob vpisu in nato enkrat na leto. Karte za obiske, enkratni obisk in 10 obiskov, je nimajo.`,
  },
  {
    question: "Kaj, če izgubim kartico?",
    answer: `Izdelava nove kartice stane ${eur(
      cardFee,
    )}. Pokliči ali piši in dogovorimo se za prevzem.`,
  },
  {
    question: "Koliko časa velja karta za 10 obiskov?",
    answer: `${tenVisits.validity}. V tem času porabiš deset obiskov, kadar in na kateri lokaciji želiš. Karta stane ${eur(
      tenVisits.price,
    )}.`,
  },
  {
    question: "Kako poteka osebni trening?",
    answer: `Osebnega trenerja najameš za eno uro (${eur(single.price)}) ali v paketu ${listSl(
      packages.map((entry) => String(entry.hours)),
      "ali",
    )} ur (${listSl(
      packages.map((entry) => eur(entry.price)),
      "ali",
    )}). Paketi veljajo do porabe, termine pa dogovoriš po telefonu ali e-pošti.`,
  },
];
