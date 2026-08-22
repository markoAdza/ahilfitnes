import { EquipmentShowcase } from "@/components/EquipmentShowcase";
import { Hero } from "@/components/Hero";
import { LocationCards } from "@/components/LocationCards";
import { PricingTeaser } from "@/components/PricingTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LocationCards />
      <EquipmentShowcase />
      <PricingTeaser />
    </>
  );
}
