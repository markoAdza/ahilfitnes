import { JoinButton } from "@/components/JoinButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eur, forms, pluralize } from "@/lib/i18n";
import { perHour, training } from "@/lib/pricing";

/**
 * Paketi osebnega trenerja kot tabela: ure, ritem s tiskanega cenika, cena in
 * izračunana cena ure. Deljena med /cenik in povabilom na domači strani, da
 * je razpon cen povsod enak.
 */
export function TrainingTable({ className }: { className?: string }) {
  return (
    <table className={["w-full text-left", className].filter(Boolean).join(" ")}>
      <caption className="sr-only">Paketi osebnega trenerja</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Paket</th>
          <th scope="col">Cena</th>
          <th scope="col">Cena ure</th>
        </tr>
      </thead>
      <tbody>
        {training.map((entry) => (
          <tr key={entry.hours} className="border-b border-line last:border-b-0">
            <th scope="row" className="py-5 pr-4 align-baseline font-normal">
              <span className="type-h3 block text-chalk">
                {pluralize(entry.hours, forms.ura)}
              </span>
              {entry.cadence ? (
                <span className="mt-0.5 block text-sm text-muted">{entry.cadence}</span>
              ) : null}
            </th>
            <td className="py-5 pr-4 text-right align-baseline">
              <span className="type-h3 text-[1.5rem] text-chalk">{eur(entry.price)}</span>
            </td>
            <td className="w-28 py-5 text-right align-baseline text-sm text-muted">
              {eur(perHour(entry))} na uro
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Osebno trenerstvo na /cenik. */
export function TrainingBlock() {
  return (
    <section id="osebni-trening" className="py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            index={2}
            label="Osebno trenerstvo"
            title="Najem osebnega trenerja"
            intro="Ena ura ali paket ur. Paketi veljajo do porabe, termine pa dogovoriš po telefonu ali e-pošti."
          />
          <JoinButton pass="Osebni trening" className="mt-9">
            Dogovori se za trening
          </JoinButton>
        </div>

        <div className="lg:col-span-7 lg:pt-8" data-reveal>
          <TrainingTable className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
