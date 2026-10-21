import Link from "next/link";

import { JoinButton } from "@/components/JoinButton";
import { TrainingTable } from "@/components/TrainingBlock";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eur } from "@/lib/i18n";
import { training, trainingFromPerHour } from "@/lib/pricing";

/**
 * Osebni trener na domači strani — kratko povabilo s pravimi številkami
 * namesto obljub. Celoten blok je na /cenik#osebni-trening.
 */
export function TrainingTeaser({ sectionIndex }: { sectionIndex?: number }) {
  return (
    <section className="grain relative border-y border-line bg-ink-2 py-20 md:py-28">
      <div className="container-page relative z-1 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            index={sectionIndex}
            label="Osebni trener"
            title="Trening z osebnim trenerjem"
            intro={`Ena ura stane ${eur(training[0].price)}. V paketu se cena ure spusti do ${eur(
              trainingFromPerHour,
            )}, paket pa velja do porabe.`}
          />

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <JoinButton pass="Osebni trening">Dogovori se za trening</JoinButton>
            <Link
              href="/cenik#osebni-trening"
              className="type-label inline-flex items-center gap-2 text-chalk transition-colors hover:text-accent-bright"
            >
              Vsi paketi
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pt-8" data-reveal>
          <TrainingTable className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
