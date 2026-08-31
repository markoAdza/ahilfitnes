"use client";

import Link from "next/link";

import { useSnapCarousel } from "@/components/motion/useSnapCarousel";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eur, forms, plural } from "@/lib/i18n";
import { plans } from "@/lib/pricing";
import { site, telHref } from "@/lib/site";

/**
 * Preklopnik članarin.
 *
 * Vse tri članarine so vedno v dokumentu in vidne — na telefonu kot vrsta, ki
 * jo povlečeš s prstom, od `lg` naprej kot mreža treh stolpcev. Krmilje zgoraj
 * torej ničesar ne odklepa, le premakne poudarek in osveži izračun prihranka.
 * Zato brez JavaScripta ne izgine nobena cena in nobena ugodnost.
 *
 * Prihranek se izračuna iz števil v lib/pricing.ts in ne prepiše kot besedilo,
 * da se stavek ne more razlikovati od zneska nad njim.
 */
export function PlanSwitcher({
  sectionIndex,
  showAllLink = false,
}: {
  sectionIndex?: number;
  showAllLink?: boolean;
}) {
  const { trackRef, controlsRef, active, scrollTo, onControlKeyDown } =
    useSnapCarousel(plans.length);

  const selected = plans[active] ?? plans[0];

  const savingsLine = selected.savings
    ? `Pri tej članarini prihraniš ${eur(selected.savings)} v ${selected.months} ${plural(
        selected.months,
        forms.mesecLoc,
      )} glede na mesečno plačevanje.`
    : "Brez vezave in brez vpisnine — prekineš kadar koli pred naslednjim obračunom.";

  return (
    <section id="clanarina" className="py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          index={sectionIndex}
          label="Članarina"
          title="Plačuj mesečno ali se zavežeš in prihraniš"
          intro="Vsaka članarina vključuje enak 24-urni dostop do vseh treh fitnesov. Vpisnine ni."
          action={
            showAllLink ? (
              <Link
                href="/cenik"
                className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-chalk transition-colors hover:text-accent"
              >
                Celoten cenik
                <ArrowRightIcon aria-hidden="true" className="size-4" />
              </Link>
            ) : undefined
          }
        />

        {/* Krmilje — segmentni preklopnik */}
        <div className="mt-10" data-reveal>
          {/*
           * Ovoj z drsenjem: pri 320 px trije napisi ("Mesečno", "6 mesecev",
           * "12 mesecev") skupaj presežejo širino zaslona in zadnji gumb bi
           * ostal odrezan pod `overflow-x: hidden` telesa — torej neviden in
           * nedosegljiv. Tako se ga da doseči s potegom.
           */}
          <div className="overflow-x-auto">
            <ul
              ref={controlsRef}
              className="inline-flex rounded-[2px] border border-line p-1"
            >
              {plans.map((plan, index) => (
                <li key={plan.slug}>
                  <button
                    type="button"
                    onClick={() => scrollTo(index)}
                    onKeyDown={(event) => onControlKeyDown(event, index)}
                    aria-current={active === index ? "true" : undefined}
                    className={[
                      "rounded-[1px] px-3.5 py-2.5 text-[0.875rem] whitespace-nowrap transition-colors sm:px-4",
                      active === index
                        ? "bg-accent font-medium text-ink"
                        : "text-body hover:text-chalk",
                    ].join(" ")}
                  >
                    {plan.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/*
           * Samo ta vrstica se oglasi bralniku zaslona ob menjavi. Če bi bila
           * `aria-live` na celotni mreži, bi ob vsakem kliku prebral vse tri
           * kartice znova.
           */}
          <p aria-live="polite" className="mt-4 text-[0.9375rem] text-accent">
            {savingsLine}
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={`Članarine, ${plans.length} skupaj`}
        className="snap-row container-page mt-8 flex gap-4 overflow-x-auto lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-x-visible"
        data-reveal
        data-reveal-delay="1"
      >
        {plans.map((plan, index) => {
          const isActive = active === index;

          return (
            <article
              key={plan.slug}
              className={[
                "snap-item flex w-[82%] shrink-0 flex-col rounded-[2px] border bg-ink-2 p-6 transition-colors sm:w-[58%] md:w-[42%] md:p-7 lg:w-auto",
                isActive ? "border-accent" : "border-line",
              ].join(" ")}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="type-h3">{plan.name}</h3>
                {plan.recommended ? (
                  <Label tone="accent">Priporočeno</Label>
                ) : null}
              </div>

              <p className="mt-5 flex items-baseline gap-2">
                <span
                  className={[
                    "type-stat text-[3rem]",
                    isActive ? "text-accent" : "text-chalk",
                  ].join(" ")}
                >
                  {plan.monthly}
                </span>
                <span className="text-sm text-muted">€ na mesec</span>
              </p>

              <p className="mt-3 text-[0.9375rem] text-body">{plan.billing}</p>

              {/* Drži tri stolpce na isti osnovnici, tudi ko prihranka ni. */}
              <p className="mt-1 min-h-6 text-sm text-muted">
                {plan.savings ? `Prihraniš ${eur(plan.savings)}` : ""}
              </p>

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
                variant={isActive ? "primary" : "outline"}
                size="lg"
                className="mt-8 w-full"
                aria-label={`Vpiši se na članarino ${plan.name} — pokliči ${site.phone}`}
              >
                Pokliči in se vpiši
              </ButtonLink>
            </article>
          );
        })}
      </div>

      <div className="container-page">
        <div className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9375rem] text-body">
            Vpišeš se na recepciji v katerem koli od treh fitnesov ali po telefonu.
          </p>
          <ButtonLink href={telHref(site.phone)} className="shrink-0">
            Pokliči {site.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
