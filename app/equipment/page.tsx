import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { EquipmentFilterGrid } from "@/components/EquipmentFilterGrid";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Equipment",
  description:
    "Explore the full range of cardio, strength, functional and recovery equipment available 24/7 at all three Ahil Fitness locations.",
  openGraph: {
    title: "Premium Equipment Collection | Ahil Fitness",
    description:
      "Cardio, strength, functional and recovery equipment across Hrastnik, Zagorje and Sevnica.",
  },
};

export default function EquipmentPage() {
  return (
    <>
      <PageHero
        title="Premium Equipment Collection"
        image="/images/equipment-hero.jpg"
        alt="Rows of cardio machines in a bright Ahil Fitness gym floor"
        crumbs={[{ label: "Home", href: "/" }, { label: "Equipment" }]}
      />

      <EquipmentFilterGrid />

      <CtaBand
        title="Ready to put it to work?"
        body="Every machine on this page is included with any membership, at all three locations."
      />
    </>
  );
}
