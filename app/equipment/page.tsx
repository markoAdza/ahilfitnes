import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { EquipmentCatalogue } from "@/components/EquipmentCatalogue";
import { PageHeader } from "@/components/PageHeader";
import { equipment } from "@/lib/equipment";

export const metadata: Metadata = {
  title: "Equipment",
  description:
    "The full list of cardio, strength, functional and recovery equipment at all three Ahil Fitness gyms, with specifications for each.",
  openGraph: {
    title: "Equipment — Ahil Fitness",
    description:
      "Cardio, strength, functional and recovery equipment across Hrastnik, Zagorje and Sevnica.",
  },
};

export default function EquipmentPage() {
  return (
    <>
      <PageHeader
        title="Equipment"
        intro={`Every one of the ${equipment.length} machines and areas below is at all three gyms, and included with any membership. Specifications are listed so you know what you are walking into.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Equipment" }]}
      />

      <EquipmentCatalogue />

      <CtaBand
        title="Come and try it"
        body="Walk in during reception hours for a look around, or buy a day pass for €15 and use the place properly."
      />
    </>
  );
}
