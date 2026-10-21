import { SectionHeading } from "@/components/ui/SectionHeading";
import { eur } from "@/lib/i18n";
import { otherFees } from "@/lib/pricing";

/** Druge storitve s tiskanega cenika: letna članarina in nova kartica. */
export function FeeList() {
  return (
    <section id="druge-storitve" className="pb-20 md:pb-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading index={3} label="Druge storitve" title="Članarina in kartica" />
        </div>

        <div className="lg:col-span-7 lg:pt-8" data-reveal>
          <dl className="border-t border-line">
            {otherFees.map((fee) => (
              <div
                key={fee.name}
                className="flex items-baseline justify-between gap-6 border-b border-line py-5"
              >
                <dt>
                  <span className="type-h3 block text-chalk">{fee.name}</span>
                  <span className="mt-0.5 block text-sm text-muted">{fee.note}</span>
                </dt>
                <dd className="type-h3 nums shrink-0 text-[1.5rem] text-chalk">
                  {eur(fee.price)}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-muted">Vse cene so z DDV.</p>
        </div>
      </div>
    </section>
  );
}
