import { EquipmentShowcase } from "@/components/EquipmentShowcase";
import { FactsBand } from "@/components/FactsBand";
import { Hero } from "@/components/Hero";
import { Locations } from "@/components/Locations";
import { PricingTeaser } from "@/components/PricingTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FactsBand />
      <Locations />
      <EquipmentShowcase />
      <PricingTeaser />
    </>
  );
}
