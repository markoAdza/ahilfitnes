import { ReceptionStatus } from "@/components/ReceptionStatus";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { site, telHref } from "@/lib/site";

/**
 * Zaključni pas, da vsebinske strani ne tečejo naravnost v nogo.
 *
 * Na temni strani ga loči akcentno obarvana površina in lasnica v bakru — ne
 * polno akcentno polnilo, ki bi na tem mestu kričalo. Zraven stoji živ status
 * recepcije, ker je edino, kar loči "pokliči zdaj" od "pokliči zjutraj".
 */
export function CtaBand({
  title,
  body,
  cta = "Pokliči in se vpiši",
}: {
  title: string;
  body: string;
  cta?: string;
}) {
  return (
    <section className="grain relative border-t border-accent/40 bg-accent-dim">
      <div className="container-page relative z-1 flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:gap-16 md:py-20">
        <div className="max-w-xl" data-reveal>
          <h2 className="type-h2 text-chalk">{title}</h2>
          <p className="type-lede mt-4 text-body">{body}</p>
        </div>

        <div
          className="flex shrink-0 flex-col items-start gap-4"
          data-reveal
          data-reveal-delay="1"
        >
          <ButtonLink href={telHref(site.phone)} size="lg">
            {cta}
          </ButtonLink>

          <a
            href={telHref(site.phone)}
            className="inline-flex items-center gap-2 text-chalk transition-colors hover:text-accent"
          >
            <PhoneIcon aria-hidden="true" className="size-4 text-accent" />
            <span className="nums type-h3">{site.phone}</span>
          </a>

          <ReceptionStatus />
        </div>
      </div>
    </section>
  );
}
