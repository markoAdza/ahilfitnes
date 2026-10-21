import Link from "next/link";

import { PassCard } from "@/components/PassCard";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eur } from "@/lib/i18n";
import { annualFee, pass, passes } from "@/lib/pricing";

/** Najkrajša, najbolj priljubljena in najdaljša — razpon, ne izbor. */
const preview = [pass("enkratni-obisk"), pass("mesecna"), pass("letna")];

/**
 * Cenik na domači strani: tri karte, ki pokažejo razpon, in pot do vseh.
 * Iste kartice kot na /cenik, zato se zneska ne moreta razlikovati.
 */
export function PricingPreview({ sectionIndex }: { sectionIndex?: number }) {
  return (
    <section className="py-20 md:py-24">
      <div className="container-page">
        <SectionHeading
          index={sectionIndex}
          label="Cenik"
          title="Izberi svojo karto"
          intro={`Od enkratnega obiska do letne karte. K časovnim kartam se plača letna članarina, ${eur(
            annualFee,
          )}.`}
          action={
            <Link
              href="/cenik"
              className="type-label inline-flex items-center gap-2 text-chalk transition-colors hover:text-accent-bright"
            >
              Vseh {passes.length} kart
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          }
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {preview.map((entry, index) => (
            <li key={entry.slug} data-reveal data-reveal-delay={String(index + 1)}>
              <PassCard entry={entry} />
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-muted">Vse cene so z DDV.</p>
      </div>
    </section>
  );
}
