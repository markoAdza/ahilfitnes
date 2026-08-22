import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { plans } from "@/lib/pricing";

export function PricingTeaser() {
  return (
    <section id="pricing" className="bg-white py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing"
          title="Flexible Membership Options"
          subtitle="Choose the plan that fits your lifestyle. All memberships include 24/7 access to all three locations"
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.slug} className="relative">
              {plan.popular ? (
                <div className="absolute -top-3 right-6 z-10">
                  <Badge tone="coral" className="px-3 py-1 text-[0.625rem] tracking-widest">
                    MOST POPULAR
                  </Badge>
                </div>
              ) : null}

              <article
                className={[
                  "flex h-full flex-col rounded-2xl border bg-white p-7",
                  plan.popular
                    ? "border-lime shadow-[0_0_0_1px_var(--color-lime)]"
                    : "border-line",
                ].join(" ")}
              >
                {plan.save ? (
                  <div className="mb-4">
                    <Badge tone="coral" className="text-[0.625rem] tracking-widest">
                      {plan.save}
                    </Badge>
                  </div>
                ) : null}

                <h3 className="text-2xl font-bold">{plan.name}</h3>

                <p className="mt-3 flex items-end gap-1">
                  <span className="text-5xl font-black tracking-tight text-ink">
                    &euro;{plan.monthly}
                  </span>
                  <span className="pb-1.5 text-sm text-body">/month</span>
                </p>

                <ButtonLink
                  href="/pricing"
                  variant="outline"
                  size="lg"
                  className="mt-7 w-full"
                >
                  View Details
                </ButtonLink>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 font-bold text-ink transition-colors hover:text-lime-ink"
          >
            View Full Price List
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
