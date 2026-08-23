import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { plans } from "@/lib/pricing";
import { site, telHref } from "@/lib/site";

/**
 * The three plans in full.
 *
 * No overlapping ribbon, no scale transform and no second discount badge: the
 * recommended plan is marked by an ink border and one small label, which is
 * enough to read as the default without shouting over the other two.
 */
export function PricingCards() {
  return (
    <section className="bg-sand py-16 md:py-20">
      <div className="container-page">
        <ul className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.slug} className="flex">
              <article
                className={[
                  "flex w-full flex-col rounded-[2px] border bg-white p-7 md:p-8",
                  plan.recommended ? "border-ink" : "border-line",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="type-h3">{plan.name}</h2>
                  {plan.recommended ? <Label tone="accent">Recommended</Label> : null}
                </div>

                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="nums font-display text-5xl font-semibold tracking-tight text-ink">
                    €{plan.monthly}
                  </span>
                  <span className="text-sm text-muted">a month</span>
                </p>

                <p className="mt-3 text-[0.9375rem] text-body">{plan.billing}</p>
                <p className="mt-1 min-h-6 text-sm text-muted">{plan.save ?? ""}</p>

                <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-line pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-accent"
                      />
                      <span className="text-[0.9375rem] text-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={telHref(site.phone)}
                  variant={plan.recommended ? "primary" : "secondary"}
                  size="lg"
                  className="mt-8 w-full"
                  aria-label={`Sign up for the ${plan.name} plan — call ${site.phone}`}
                >
                  Call to sign up
                </ButtonLink>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
