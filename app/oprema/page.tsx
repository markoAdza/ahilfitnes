import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { EquipmentExplorer } from "@/components/EquipmentExplorer";
import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { equipment } from "@/lib/equipment";
import { eur, forms, plural } from "@/lib/i18n";
import { dayPassPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Oprema",
  description:
    "Celoten seznam kardio, močnostne, funkcionalne in regeneracijske opreme v vseh treh fitnesih Ahil Fitnes, s specifikacijami za vsako napravo.",
  alternates: { canonical: "/oprema" },
  openGraph: {
    title: "Oprema — Ahil Fitnes",
    description:
      "Kardio, moč, funkcionalna vadba in regeneracija v Hrastniku, Zagorju in Sevnici.",
  },
};

export default function EquipmentPage() {
  return (
    <>
      <PageHeader
        title="Oprema"
        intro={`Vsaka od ${equipment.length} ${plural(
          equipment.length,
          forms.naprava,
        )} in prostorov spodaj je v vseh treh fitnesih in vključena v vsako članarino. Specifikacije so izpisane, da veš, v kaj greš.`}
        crumbs={[{ label: "Domov", href: "/" }, { label: "Oprema" }]}
      />

      <EquipmentExplorer />
      <Gallery />

      <CtaBand
        title="Pridi pogledat"
        body={`Med urami recepcije se oglasi na ogled, ali pa kupi dnevno vstopnico za ${eur(
          dayPassPrice,
        )} in prostor preizkusi zares.`}
      />
    </>
  );
}
