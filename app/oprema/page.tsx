import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { EquipmentExplorer } from "@/components/EquipmentExplorer";
import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { categories } from "@/lib/equipment";
import { eur, listSl } from "@/lib/i18n";
import { fromPrice } from "@/lib/pricing";
import { locations } from "@/lib/site";

const zones = listSl(categories.map((entry) => entry.name.toLowerCase()));

export const metadata: Metadata = {
  title: "Oprema",
  description: `Oprema v fitnesih Ahil Fitnes: ${zones}. Dostopno 24 ur na dan, z vsako karto.`,
  alternates: { canonical: "/oprema" },
  openGraph: {
    title: "Oprema — Ahil Fitnes",
    description: `${categories.map((entry) => entry.name).join(", ")} — v ${listSl(
      locations.map((location) => location.locative),
    )}.`,
  },
};

export default function EquipmentPage() {
  return (
    <>
      <PageHeader
        title="Oprema"
        intro={`Štiri cone: ${zones}. Vse so vključene v vsako karto in dostopne 24 ur na dan.`}
        crumbs={[{ label: "Domov", href: "/" }, { label: "Oprema" }]}
      />

      <EquipmentExplorer />
      <Gallery />

      <CtaBand
        title="Pridi preizkusit"
        body={`Enkratni obisk stane ${eur(
          fromPrice,
        )}. Pokliči ali piši in se dogovorimo, kdaj prideš po kartico.`}
      />
    </>
  );
}
