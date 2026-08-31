import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { PlanSwitcher } from "@/components/PlanSwitcher";
import { PriceList } from "@/components/PriceList";
import { eur } from "@/lib/i18n";
import { fromPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Cenik",
  description:
    "Članarina Ahil Fitnes od 37 € na mesec. Mesečna, šestmesečna in dvanajstmesečna članarina z 24-urnim dostopom do vseh treh fitnesov, plus cene osebnih treningov in skupinskih vadb.",
  alternates: { canonical: "/cenik" },
  openGraph: {
    title: "Cenik — Ahil Fitnes",
    description:
      "Mesečno 49 €, šest mesecev 42 € na mesec, dvanajst mesecev 37 € na mesec — vse z 24-urnim dostopom do treh fitnesov.",
  },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Članarina in cene"
        intro={`Od ${eur(
          fromPrice,
        )} na mesec za 24-urni dostop do vseh treh fitnesov. Vpisnine ni, mesečno članarino pa prekineš kadar koli.`}
        crumbs={[{ label: "Domov", href: "/" }, { label: "Cenik" }]}
      />

      <PlanSwitcher />
      <PriceList />

      <CtaBand
        title="Nisi prepričan, katera članarina je prava?"
        body="Pokliči in se pogovorimo. Če omahuješ med dvema, začni z mesečno — na daljšo lahko preideš, kadar koli želiš."
        cta="Pogovori se z nami"
      />
    </>
  );
}
