import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { PriceList } from "@/components/PriceList";
import { PricingCards } from "@/components/PricingCards";
import { fromPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Ahil Fitness membership from €37 a month. Monthly, six-month and twelve-month plans with 24-hour access to all three gyms, plus personal training and class rates.",
  openGraph: {
    title: "Pricing — Ahil Fitness",
    description:
      "Monthly €49, six months €42 a month, twelve months €37 a month — all with 24-hour access to three gyms.",
  },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Membership and prices"
        intro={`From €${fromPrice} a month for 24-hour access to all three gyms. No joining fee, and the monthly plan cancels any time.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      />

      <PricingCards />
      <PriceList />

      <CtaBand
        title="Not sure which plan fits?"
        body="Call and we will talk it through. If you are between two plans, start on the monthly one — you can move up whenever you want."
        cta="Talk to us"
      />
    </>
  );
}
