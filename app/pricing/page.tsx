import type { Metadata } from "next";

import { AddOnCards } from "@/components/AddOnCards";
import { CtaBand } from "@/components/CtaBand";
import { PriceTable } from "@/components/PriceTable";
import { PricingCards } from "@/components/PricingCards";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Ahil Fitness memberships from €37/month. Monthly, 6-month and annual plans with 24/7 access to all three locations, plus personal training and group class rates.",
  openGraph: {
    title: "Flexible Membership Options | Ahil Fitness",
    description:
      "Monthly €49, 6 months €42/month, annual €37/month — all with 24/7 access to three locations.",
  },
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-white pt-16 pb-12 md:pt-24">
        <div className="container-page">
          <SectionHeading
            as="h1"
            eyebrow="Pricing"
            title="Flexible Membership Options"
            subtitle="Choose the plan that fits your lifestyle. All memberships include 24/7 access to all three locations"
          />
        </div>
      </section>

      <PricingCards />
      <PriceTable />
      <AddOnCards />

      <CtaBand
        title="Not sure which plan fits?"
        body="Call us and we will talk it through — no pressure, no joining fee."
        cta="Talk to Us"
      />
    </>
  );
}
