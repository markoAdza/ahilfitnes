import { JoinButton } from "@/components/JoinButton";
import { CheckIcon } from "@/components/ui/Icons";
import { eur } from "@/lib/i18n";
import { annualFee, needsAnnualFee, perMonth, type Pass } from "@/lib/pricing";
import { site } from "@/lib/site";

/** Kar velja za vsako karto — zato ga kartica pove, namesto da bi ga skrila v opombo. */
const included = ["Velja na vseh lokacijah", site.access, "Garderobe in prhe"];

/**
 * Ena karta v ceniku.
 *
 * Najbolj priljubljena karta dobi bronast rob, toplejšo podlago in polni gumb;
 * vse ostale imajo obrobljen gumb, da je na strani le en poudarjen poziv na
 * vrsto. Letna članarina je izpisana na vsaki časovni kartici, ker brez nje
 * cena ne bi bila cela; karte za obiske je nimajo.
 */
export function PassCard({ entry }: { entry: Pass }) {
  const monthly = perMonth(entry);

  return (
    <article
      className={[
        "relative flex h-full flex-col rounded-[2px] border p-7",
        entry.popular ? "border-accent bg-accent-dim" : "border-line bg-ink-2",
      ].join(" ")}
    >
      {entry.popular ? (
        <p className="type-label absolute -top-3 left-6 bg-accent-bright px-2.5 py-1 text-ink">
          Najbolj priljubljeno
        </p>
      ) : null}

      <h3 className="type-label text-chalk">{entry.name}</h3>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="type-stat text-chalk">{entry.price}</span>
        <span className="type-h3 text-accent">€</span>
      </p>
      <p className="mt-2 text-sm text-muted">
        {entry.validity}
        {monthly ? ` · ${eur(monthly)} na mesec` : null}
      </p>

      <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-line pt-5">
        {included.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-body">
            <CheckIcon aria-hidden="true" className="mt-1 size-3.5 shrink-0 text-accent" />
            {item}
          </li>
        ))}
      </ul>

      <JoinButton
        pass={entry.name}
        variant={entry.popular ? "primary" : "outline"}
        className="mt-8 w-full"
      >
        Izberi
      </JoinButton>
      <p className="mt-3 text-center text-xs text-muted">
        {needsAnnualFee(entry) ? `+ letna članarina ${eur(annualFee)}` : "Brez letne članarine"}
      </p>
    </article>
  );
}
