import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { FeeList } from "@/components/FeeList";
import { PageHeader } from "@/components/PageHeader";
import { PassGrid } from "@/components/PassGrid";
import { TrainingBlock } from "@/components/TrainingBlock";
import { Divider } from "@/components/ui/Divider";
import { eur } from "@/lib/i18n";
import { annualFee, fromPrice, pass, training } from "@/lib/pricing";

const monthly = pass("mesecna");
const yearly = pass("letna");

export const metadata: Metadata = {
  title: "Cenik",
  description: `Cenik Ahil Fitnes: enkratni obisk ${eur(fromPrice)}, mesečna karta ${eur(
    monthly.price,
  )}, letna karta ${eur(yearly.price)}. Vse karte veljajo na vseh lokacijah, 24 ur na dan. Osebni trener od ${eur(
    training[0].price,
  )} na uro.`,
  alternates: { canonical: "/cenik" },
  openGraph: {
    title: "Cenik — Ahil Fitnes",
    description: `Od ${eur(fromPrice)} za obisk do ${eur(
      yearly.price,
    )} za leto. Letna članarina ${eur(annualFee)}. Vse cene so z DDV.`,
  },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Cenik"
        intro={`Od enkratnega obiska za ${eur(
          fromPrice,
        )} do letne karte. Vsaka karta velja na vseh lokacijah, 24 ur na dan. Vse cene so z DDV.`}
        crumbs={[{ label: "Domov", href: "/" }, { label: "Cenik" }]}
      />

      <PassGrid />

      <div className="container-page">
        <Divider />
      </div>

      <TrainingBlock />
      <FeeList />

      <CtaBand
        title="Ne veš, katera karta je prava?"
        body="Pokliči ali piši in povej, kako pogosto boš prihajal. Če omahuješ, začni z mesečno — na daljšo lahko preideš kadar koli."
      />
    </>
  );
}
