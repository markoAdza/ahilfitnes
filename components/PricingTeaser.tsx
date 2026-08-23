import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { plans } from "@/lib/pricing";
import { site, telHref } from "@/lib/site";

/**
 * Rate card for the three plans.
 *
 * The old teaser showed three cards containing a price and a "View Details"
 * button and nothing else — three clicks to learn anything. This states the
 * rate, how it is billed and what it saves, so the section answers the
 * question on its own.
 */
export function PricingTeaser() {
  return (
    <section id="pricing" className="bg-sand py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          label="Membership"
          title="Pay monthly, or commit and save"
          intro="Every plan includes the same 24-hour access to all three gyms. There is no joining fee."
          action={
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent"
            >
              Full price list
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          }
        />

        <div className="mt-14 rounded-[2px] border border-line bg-white">
          <dl className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {plans.map((plan) => (
              <div key={plan.slug} className="flex flex-col gap-1 p-7 md:p-8">
                <dt className="flex items-baseline justify-between gap-3">
                  <span className="type-h3 text-ink">{plan.name}</span>
                  {plan.recommended ? (
                    <Label tone="accent">Recommended</Label>
                  ) : null}
                </dt>

                <dd className="mt-3">
                  <p className="flex items-baseline gap-1.5">
                    <span className="nums font-display text-5xl font-semibold tracking-tight text-ink">
                      €{plan.monthly}
                    </span>
                    <span className="text-sm text-muted">a month</span>
                  </p>

                  <p className="mt-3 text-[0.9375rem] text-body">{plan.billing}</p>

                  {/* Keeps the three columns on the same baseline. */}
                  <p className="mt-1 text-sm text-muted">
                    {plan.save ?? " "}
                  </p>
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col items-start gap-4 border-t border-line px-7 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <p className="text-[0.9375rem] text-body">
              Sign up at reception in any of the three gyms, or over the phone.
            </p>
            <ButtonLink href={telHref(site.phone)} className="shrink-0">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
