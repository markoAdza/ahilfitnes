import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { plans } from "@/lib/pricing";
import { site, telHref } from "@/lib/site";

export function PricingCards() {
  return (
    <section className="bg-white pb-8 md:pb-12">
      <div className="container-page">
        <ul className="grid items-start gap-8 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <li key={plan.slug} className="relative lg:pt-4">
              {plan.popular ? (
                <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2">
                  <Badge
                    tone="coral"
                    className="px-5 py-2 text-xs tracking-widest shadow-sm"
                  >
                    MOST POPULAR
                  </Badge>
                </div>
              ) : null}

              <article
                className={[
                  "flex h-full flex-col rounded-2xl border bg-white px-8 pb-8 text-center",
                  /* Extra headroom so MOST POPULAR does not crowd SAVE 15%. */
                  plan.popular
                    ? "border-2 border-lime pt-12 lg:scale-[1.03]"
                    : "border-line pt-8",
                ].join(" ")}
              >
                {plan.save ? (
                  <div className="mb-5">
                    <Badge tone="coral" className="px-4 py-1.5 text-xs tracking-wider">
                      {plan.save}
                    </Badge>
                  </div>
                ) : (
                  /* Keeps the three card headers on the same baseline. */
                  <div aria-hidden="true" className="mb-5 h-[1.875rem]" />
                )}

                <h2 className="text-3xl font-bold">{plan.name}</h2>

                <p className="mt-4 flex items-end justify-center gap-1">
                  <span className="text-6xl font-black tracking-tight text-ink">
                    &euro;{plan.monthly}
                  </span>
                  <span className="pb-2 text-lg text-body">/month</span>
                </p>

                <p className="mt-2 text-sm text-body">
                  {plan.upfront
                    ? `€${plan.upfront} (paid upfront)`
                    : `€${plan.monthly} billed monthly`}
                </p>

                <ul className="mt-8 flex flex-1 flex-col gap-4 text-left">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="mt-1 size-4 shrink-0 text-lime-ink" />
                      <span className="text-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={telHref(site.phone)}
                  variant={plan.popular ? "lime" : "ink"}
                  size="lg"
                  className="mt-8 w-full"
                  aria-label={`Select the ${plan.name} plan — call ${site.phone}`}
                >
                  Select Plan
                </ButtonLink>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
