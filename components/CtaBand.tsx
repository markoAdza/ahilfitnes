import { JoinButton } from "@/components/JoinButton";
import { HelmetMark } from "@/components/ui/HelmetMark";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { mailHref, site, telHref } from "@/lib/site";

/**
 * Zaključni pas, da vsebinske strani ne tečejo naravnost v nogo.
 *
 * Toplejša bronasta podlaga in lasnica v bronu ga ločita od strani — ne polno
 * akcentno polnilo, ki bi na tem mestu kričalo. Ob gumbu stojita telefon in
 * e-pošta, ker sta edini poti do vpisa.
 */
export function CtaBand({
  title,
  body,
  cta = "Pridruži se",
}: {
  title: string;
  body: string;
  cta?: string;
}) {
  return (
    <section className="grain relative overflow-hidden border-t border-accent/40 bg-accent-dim">
      {/* Odmev čelade iz heroja — tih, v barvi lasnice, odrezan čez rob. */}
      <HelmetMark
        tone="current"
        className="pointer-events-none absolute -right-16 -bottom-24 h-[130%] w-auto text-accent-deep/25 md:right-0"
      />

      <div className="container-page relative z-1 flex flex-col gap-10 py-20 md:flex-row md:items-end md:justify-between md:gap-16 md:py-24">
        <div className="max-w-xl" data-reveal>
          <h2 className="type-h2 text-chalk">{title}</h2>
          <p className="type-lede mt-5 text-body">{body}</p>
        </div>

        <div
          className="flex shrink-0 flex-col items-start gap-4"
          data-reveal
          data-reveal-delay="1"
        >
          <JoinButton>{cta}</JoinButton>

          <a
            href={telHref(site.phone)}
            className="inline-flex items-center gap-2.5 text-chalk transition-colors hover:text-accent-bright"
          >
            <PhoneIcon aria-hidden="true" className="size-4 text-accent" />
            <span className="nums type-h3">{site.phone}</span>
          </a>
          <a
            href={mailHref("Vpis")}
            className="inline-flex items-center gap-2.5 text-chalk transition-colors hover:text-accent-bright"
          >
            <MailIcon aria-hidden="true" className="size-4 text-accent" />
            <span className="type-h3">{site.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
